const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  IPv4: { type: String, required: false },
  country: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  gender: { type: String, required: false },
  creationDate: { type: Date, required: true, default: Date.now },
  device: {
    windowPixels: { type: Array, required: false },
    browser: { type: String, required: false },
    oSystem: { type: String, required: false },
  },
});

module.exports = Form = mongoose.model("Form", FormSchema);
