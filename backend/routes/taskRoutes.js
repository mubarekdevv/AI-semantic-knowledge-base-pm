const express = require("express");
const router = express.Router();



const {
  createTask,
  handleQuery,
  getTasks,
  deleteCompleted,
  deleteByName
} = require("../controllers/taskController");

router.post("/task", createTask);
router.post("/query", handleQuery);
router.get("/tasks", getTasks);

router.delete("/tasks/completed", deleteCompleted);
router.delete("/tasks/by-name", deleteByName);

module.exports = router;