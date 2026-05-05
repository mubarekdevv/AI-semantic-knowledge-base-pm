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

  // detect urgency
  if (question.includes("urgent")) {
    return tasks.filter(
      (t) => new Date(t.deadline) - new Date() < 3 * 24 * 60 * 60 * 1000,
    );
  }

  // project tasks
  if (question.includes("project")) {
    const name = question.split("project")[1]?.trim();
    return tasks.filter((t) => t.project.toLowerCase().includes(name));
  }

  return { message: "Query not understood" };
};;

module.exports = { processQuery };
