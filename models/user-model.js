const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  lastEntry: { type: Date, required: true, default: Date.now },
});

module.exports = User = mongoose.model("User", UserSchema);
