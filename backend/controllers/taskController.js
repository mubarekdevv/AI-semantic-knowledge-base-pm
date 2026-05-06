
const { addTask, getAllTasks } = require("../models/taskModel");
const { processQuery } = require("../services/aiService");
const {deleteCompletedTasks, deleteTaskByName,} = require("../models/taskModel");

const deleteCompleted = (req, res) => {
  deleteCompletedTasks();
  res.json({ message: "Completed tasks deleted" });
};

const deleteByName = (req, res) => {
  const { name } = req.body;
  deleteTaskByName(name);
  res.json({ message: `Task "${name}" deleted` });
};

const createTask = (req, res) => {
  addTask(req.body);
  res.json({ message: "Task added" });
};

const getTasks = (req, res) => {
  const tasks = getAllTasks();
  res.json(tasks);
};

const handleQuery = (req, res) => {
  const tasks = getAllTasks();
  const result = processQuery(req.body.question);
  res.json(result);
};

module.exports = { createTask, handleQuery, getTasks, deleteCompleted, deleteByName };
