// services/aiService.js

const processQuery = (tasks, question) => {
  question = question.toLowerCase();

  // delayed tasks
  if (question.includes("delay") || question.includes("late")) {
    return tasks.filter(
      (t) => new Date(t.deadline) < new Date() && t.status !== "done",
    );
  }

  // risks
  if (question.includes("risk") || question.includes("problem")) {
    const risks = tasks.filter(
      (t) => new Date(t.deadline) < new Date() && t.status !== "done",
    );
    return { risks };
  }

  // project tasks
  if (question.includes("project")) {
    const name = question.split("project")[1]?.trim();
    return tasks.filter((t) => t.project.toLowerCase().includes(name));
  }

  return { message: "Query not understood" };
};

module.exports = { processQuery };
