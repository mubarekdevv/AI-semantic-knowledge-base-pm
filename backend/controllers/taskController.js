
const { addTask, getAllTasks } = require("../models/taskModel");
const { processQuery } = require("../services/aiService");

const createTask = (req, res) => {
  addTask(req.body);
  res.json({ message: "Task added" });
};

const handleQuery = (req, res) => {
  const tasks = getAllTasks();
  const result = processQuery(tasks, req.body.question);
  res.json(result);
};

module.exports = { createTask, handleQuery };
