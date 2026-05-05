
let tasks = [];

const addTask = (task) => {
  tasks.push(task);
};

const getAllTasks = () => tasks;

module.exports = { addTask, getAllTasks };
