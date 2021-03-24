const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitSchema = new Schema({
  counter: { type: Number, required: true, default: 0 },
  date: [{ type: Date, required: true }],
  ipAddress: [{ type: String, required: true }],
});

module.exports = Visit = mongoose.model("Visit", VisitSchema);
