const Task = require("../modals/Task");
const SubTask = require("../modals/SubTask")
const { addNewMainTask } = require("../services/taskService");
const moment = require("moment");

const getAllTasks = async (req, res) => {
  try {
    const { id: uid } = req.params;

    const tasks = await Task.find({ uid: uid });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const taskDetails = req.body;
    const { Title, startDate, dueDate, workHours, color, uid } = taskDetails;

    const task = await Task.create(req.body);


    addNewMainTask(Title, workHours, startDate, dueDate, color, uid , task._id);

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findById(taskID);

    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
    }

    await SubTask.deleteMany({ mainTaskId: taskID });


    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  getTask,
};
