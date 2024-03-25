const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  uid : String,
  Title: String,
  startDate: Date,
  dueDate: Date,
  taskType: String,
  priorityLevel: String,
  workHours: String,
  description: String,
  color : String,
  completed : Boolean,
  progress : Number,
});

module.exports = mongoose.model("Task", TaskSchema);
