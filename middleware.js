const jwt = require("jsonwebtoken");
const User = require("./mongo/user");

const auth = async (req, res, next) => {
  console.log("auth");
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismysecretkey");
    const user = await User.findOne({
      user_id: decoded.user_id,
      "tokens.token": token,
    });

    if (!user) throw new Error("Unable to login");

    console.log("decoded", decoded);
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
};
module.exports = auth;
