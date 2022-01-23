require("mongoose");
const User = require("./user");

const checkLegal = async (user_id, amount) => {
  let isLegal = {};
  await User.findOne({ user_id: user_id }, (err, data) => {
    if (err);
    if (data) {
      const newCash = data.cash - amount;
      if (newCash + data.credit < 0) {
        isLegal = new Error("not enough credit!");
      }
    } else {
      isLegal = new Error("user not found");
      console.log("not found");
    }
  }).clone();
  if (isLegal.message) throw isLegal;
};

const addUser = async (req, res) => {
  const user = {
    user_id: req.body.user_id,
    name: req.body.name,
    cash: req.body.cash,
    credit: req.body.credit,
  };
  try {
    const newUser = new User(user);
    const createdUser = await newUser.save();
    res.send(createdUser);
  } catch (e) {
    res.status(400).send(`something went wrong... ):`);
  }
};

const deposit = async (req, res) => {
  const user_id = req.params.id;
  const amount = req.body.amount;
  try {
    await checkLegal(user_id);
    const updatedUser = await User.findOneAndUpdate(
      { user_id: user_id },
      { $inc: { cash: amount } },
      { new: true }
    );
    res.send(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const withdraw = async (req, res) => {
  const user_id = req.params.id;
  const amount = req.body.amount;
  try {
    await checkLegal(user_id, amount);
    const updatedUser = await User.findOneAndUpdate(
      { user_id: user_id },
      { $inc: { cash: -amount } },
      { new: true }
    );
    res.send(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const updateCredit = async (req, res) => {
  const user_id = req.params.id;
  const amount = req.body.amount;
  try {
    await checkLegal(user_id);
    const updatedUser = await User.findOneAndUpdate(
      { user_id: user_id },
      { credit: amount },
      { new: true }
    );
    res.send(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const transfer = async (req, res) => {
  const user_idFrom = req.params.id;
  const amount = req.body.amount;
  const user_idTo = req.body.to;
  try {
    await checkLegal(user_idTo);
    await checkLegal(user_idFrom, amount);
    const updatedUserFrom = await User.findOneAndUpdate(
      { user_id: user_idFrom },
      { $inc: { cash: -amount } },
      { new: true }
    );
    const updatedUserTo = await User.findOneAndUpdate(
      { user_id: user_idTo },
      { $inc: { cash: amount } },
      { new: true }
    );
    res.send({ from: updatedUserFrom, to: updatedUserTo });
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const gatUserInfo = async (req, res) => {
  const user_id = req.params.id;
  try {
    let response;
    await User.findOne({ user_id: user_id }, (err, data) => {
      if (err) return;
      if (data) {
        res.send(data);
      } else {
        response = new Error("user not found");
      }
    }).clone();
    if (response) throw response;
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const gatAllUsers = async (req, res) => {
  try {
    await User.find({}, (err, data) => {
      if (err) return;
      if (data) {
        res.send(data);
      }
    }).clone();
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

module.exports = {
  addUser,
  deposit,
  withdraw,
  updateCredit,
  transfer,
  gatUserInfo,
  gatAllUsers,
};
