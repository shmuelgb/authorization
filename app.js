const path = require("path");
const express = require("express");
const cors = require("cors");
const utils = require("./mongo/utils");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

const publicDirectoryPath = path.join(__dirname, "client/build");
app.use(express.static(publicDirectoryPath));

app.get("/api", (req, res) => {
  res.send("Working!!!");
});

app.post("/api/users", utils.addUser);

app.patch("/api/users/:id", (req, res) => {
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

app.get("/api/users/:id", utils.gatUserInfo);

app.get("/api/users", utils.gatAllUsers);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
