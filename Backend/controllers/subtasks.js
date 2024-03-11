const SubTask = require("../modals/SubTask");

const getAllSubTasks = async (req, res) => {
  try {
    const subTasks = await SubTask.find({});
    res.status(200).json({ subTasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};



module.exports = {
  getAllSubTasks,
};
