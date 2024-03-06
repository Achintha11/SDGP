const mongoose = require("mongoose");

const SubtaskSchema = new mongoose.Schema({
  name: String,
  date: Date,
  startTime: Date,
  endTime: Date,
  duration: Number,
  type: String
});

module.exports = mongoose.model("Subtask", SubtaskSchema);
