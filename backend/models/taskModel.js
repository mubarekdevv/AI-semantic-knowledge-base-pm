
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
  tasks.push({
    id: `t${tasks.length + 1}`,
    ...task,
  });
};

const deleteCompletedTasks = () => {
  tasks = tasks.filter((t) => t.status !== "done");
};

const deleteTaskByName = (name) => {
  tasks = tasks.filter((t) => t.name.toLowerCase() !== name.toLowerCase());
};

const getAllTasks = () => tasks;

module.exports = {
  addTask,
  getAllTasks,
  tasks,
  relationships,
  deleteCompletedTasks,
  deleteTaskByName,
};
