const SubTask = require("../modals/SubTask");

const getAllSubTasks = async (req, res) => {
  try {
    const { id: uid } = req.params;
    const subTasks = await SubTask.find({ uid: uid });
    res.status(200).json({ subTasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllSubTasks,
};
