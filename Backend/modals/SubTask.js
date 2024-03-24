const mongoose = require("mongoose");

const SubtaskSchema = new mongoose.Schema({
  name: String,
  date: Date,
  startTime: Date,
  endTime: Date,
  duration: Number,
  type: String,
  uid : String,
  color : String,
  mainTaskId : String
});



module.exports = mongoose.model("Subtask", SubtaskSchema);
