const express = require('express');
const { getAllSubTasks } = require('../controllers/subtasks');
const subTaskRouter = express.Router();


subTaskRouter.route('/').get(getAllSubTasks)

module.exports  = subTaskRouter;

