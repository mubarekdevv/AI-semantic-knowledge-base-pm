const express = require("express");
const router = express.Router();

const {
  createTask,
  handleQuery,
  getTasks,
} = require("../controllers/taskController");

router.post("/task", createTask);
router.post("/query", handleQuery);
router.get("/tasks", getTasks);

module.exports = router;