// services/aiService.js

const { tasks, relationships } = require("../models/taskModel");

const processQuery = (question) => {
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
    return {
      reasoning:
        "Tasks are considered risks if they are delayed and not completed",
      data: risks,
    };
  }

  if (question.includes("dependency") || question.includes("blocked")) {
    let risks = [];

    if (!relationships || relationships.length === 0) {
      return { message: "No relationships found" };
    }

    relationships.forEach((rel) => {
      if (rel.predicate === "DEPENDS_ON") {
        const parent = tasks.find((t) => t.id === rel.object);
        const child = tasks.find((t) => t.id === rel.subject);

        if (parent && child && parent.status === "delayed") {
          risks.push({
            task: child.name,
            reason: `Blocked by delayed task: ${parent.name}`,
          });
        }
      }
    });

    return {
      reasoning: "Tasks depending on delayed tasks are at risk",
      data: risks,
    };
  }

  // detect urgency
  if (question.includes("urgent")) {
    return tasks.filter((t) => {
      const diff = new Date(t.deadline) - new Date();
      return diff < 3 * 24 * 60 * 60 * 1000 && t.status !== "done";
    });
  }

  //Show All Tasks
  if (question.includes("all tasks") || question.includes("show all")) {
    return tasks;
  }

  //Completed Tasks
  if (question.includes("completed") || question.includes("done")) {
    return tasks.filter((t) => t.status === "done");
  }

  //Summary AI
  if (question.includes("summary") || question.includes("overview")) {
    return {
      reasoning: "Summary of current project state",
      data: {
        total: tasks.length,
        completed: tasks.filter((t) => t.status === "done").length,
        pending: tasks.filter((t) => t.status === "pending").length,
        delayed: tasks.filter((t) => new Date(t.deadline) < new Date()).length,
      },
    };
  }

  //High Risk Detection
  if (question.includes("high risk")) {
    const risks = tasks.filter(
      (t) => new Date(t.deadline) < new Date() && t.status !== "done",
    );

    return {
      reasoning: "High risk tasks are delayed and unfinished",
      data: risks,
    };
  }

  // project tasks
  if (question.includes("project")) {
    const name = question.split("project")[1]?.trim();
    return tasks.filter(
      (t) => t.project && t.project.toLowerCase().includes(name),
    );
  }

  return { message: "Query not understood" };
};;

module.exports = { processQuery };
