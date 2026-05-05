
let tasks = [
  {
    id: "t1",
    name: "Database Design",
    status: "delayed",
    deadline: "2026-05-01",
  },
  {
    id: "t2",
    name: "API Implementation",
    status: "pending",
    deadline: "2026-05-10",
  },
];

let relationships = [{ subject: "t2", predicate: "DEPENDS_ON", object: "t1" }];

const addTask = (task) => {
  tasks.push(task);
};

const getAllTasks = () => tasks;

module.exports = { addTask, getAllTasks, tasks, relationships };
