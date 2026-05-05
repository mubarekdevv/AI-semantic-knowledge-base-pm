const express = require("express");
const router = express.Router();

const { createTask, handleQuery } = require("../controllers/taskController");

router.post("/task", createTask);
router.post("/query", handleQuery);

module.exports = router;