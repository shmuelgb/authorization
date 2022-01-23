const mongoose = require("mongoose");
const connectionUri = process.env.MONGO_URI;

mongoose.connect(`${connectionUri}/bankApiMongooseApp`, {
  useNewUrlParser: true,
});

const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("Users", UserSchema);
module.exports = User;

// const Product = mongoose.model("Products", {
//   name: {
//     type: String,
//   },
// });

// const test = new Product({ name: "test" });
// test.save();
