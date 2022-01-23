const path = require("path");
const express = require("express");
const cors = require("cors");
const auth = require("./middleware");
const utils = require("./mongo/utils");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8080;

const publicDirectoryPath = path.join(__dirname, "client/build");
app.use(express.static(publicDirectoryPath));

app.get("/api", auth, (req, res) => {
  res.send("Working!!!");
});

app.post("/api/users/login", auth, utils.login);

app.post("/api/users", auth, utils.addUser);

app.patch("/api/users/:id", auth, (req, res) => {
  switch (req.body.action) {
    case "deposit":
      utils.deposit(req, res);
      break;
    case "withdraw":
      utils.withdraw(req, res);
      break;
    case "update_credit":
      utils.updateCredit(req, res);
      break;
    case "transfer":
      utils.transfer(req, res);
      break;
  }
});

app.get("/api/users/:id", auth, utils.gatUserInfo);

app.get("/api/users", auth, utils.gatAllUsers);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
