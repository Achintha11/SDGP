const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  Title: String,
  startDate: Date,
  dueDate: Date,
  taskType: String,
  priorityLevel: String,
  workHours: String,
  description: String,
});

module.exports = mongoose.model("Task", TaskSchema);
