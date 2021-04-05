const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  IPv4: { type: String, required: false },
  country: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  // lat: { type: Number, required: false },
  // lon: { type: Number, required: false },
  creationDate: { type: Date, required: true, default: Date.now },
  windowPixels: { type: Array, required: true },
});

module.exports = Form = mongoose.model("Form", FormSchema);
