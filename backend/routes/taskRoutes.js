const express = require("express");
const router = express.Router();

router.delete("/tasks/completed", deleteCompleted);
router.delete("/tasks/by-name", deleteByName);

const {
  createTask,
  handleQuery,
  getTasks,
} = require("../controllers/taskController");

router.post("/task", createTask);
router.post("/query", handleQuery);
router.get("/tasks", getTasks);

module.exports = router;