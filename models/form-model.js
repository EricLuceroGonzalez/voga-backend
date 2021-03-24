const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormFormSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  IPv4: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  lat: { type: String, required: true },
  lon: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  windowPixels: { type: Array, required: true },
});

module.exports = Form = mongoose.model("Form", FormFormSchema);
