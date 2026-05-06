// services/aiService.js

const { getAllTasks, relationships } = require("../models/taskModel");

const processQuery = (question) => {
  const tasks = getAllTasks(); // 🔥 ALWAYS get latest tasks
  question = question.toLowerCase();

  //Show All Tasks
  if (
    question.includes("all tasks") ||
    question.includes("show all") ||
    question.includes("everything")
  ) {
    return tasks;
  }

  // delayed tasks
  if (
    question.includes("delay") ||
    question.includes("delayed") ||
    question.includes("late")
  ) {
    return tasks.filter(
      (t) => new Date(t.deadline) < new Date() && t.status !== "done",
    );
  }

  //overdue

  if (question.includes("overdue")) {
    return {
      reasoning: "Tasks past their deadline",
      data: tasks.filter(
        (t) => new Date(t.deadline) < new Date() && t.status !== "done",
      ),
    };
  }

  //count tasks
  if (question.includes("count")) {
    return {
      reasoning: "Counting all tasks",
      data: { total: tasks.length },
    };
  }
  //Deleting via AI
  if (question.includes("delete completed")) {
    const remaining = tasks.filter((t) => t.status !== "done");
    return {
      reasoning: "Simulating deletion of completed tasks",
      data: remaining,
    };
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
     return {
       reasoning: "No task dependencies found",
       data: [],
     };
   }

    relationships.forEach((rel) => {
      if (rel.predicate === "DEPENDS_ON") {
        const parent = tasks.find((t) => t.id === rel.object);
        const child = tasks.find((t) => t.id === rel.subject);

        if (
          parent &&
          child &&
          new Date(parent.deadline) < new Date() &&
          parent.status !== "done"
        ) {
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

  //recommend the next task
  if (question.includes("next")) {
    const upcoming = tasks
      .filter((t) => t.status !== "done")
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    return {
      reasoning: "Next task to focus on",
      data: upcoming.length ? [upcoming[0]] : [],
    };
  }

  // closest to deadline
  // Closest deadline
  if (question.includes("closest") || question.includes("nearest deadline")) {
    const upcoming = tasks
      .filter((t) => t.status !== "done")
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    return {
      reasoning: "Finding task with nearest deadline",
      data: upcoming.length ? [upcoming[0]] : [],
    };
  }

  // Sort by urgency
  if (question.includes("sort") || question.includes("urgency order")) {
    const sorted = tasks
      .filter((t) => t.status !== "done")
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    return {
      reasoning: "Sorting tasks by urgency (nearest deadline first)",
      data: sorted,
    };
  }

  // detect urgency
  if (question.includes("urgent")) {
    return tasks.filter((t) => {
      const diff = new Date(t.deadline) - new Date();
      return diff < 3 * 24 * 60 * 60 * 1000 && t.status !== "done";
    });
  }

  //Completed Tasks
  if (question.includes("completed") || question.includes("done")) {
    return tasks.filter((t) => t.status === "done");
  }

  //pending tasks
  if (question.includes("pending")) {
    return {
      reasoning: "Filtering pending tasks",
      data: tasks.filter((t) => t.status === "pending"),
    };
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
      reasoning: "Tasks are considered risks if delayed and incomplete",
      confidence: "High",
      data: risks,
    };
  }

  // project tasks
  if (question.startsWith("project")) {
    const name = question.split("project")[1]?.trim();
    return tasks.filter(
      (t) => t.project && t.project.toLowerCase().includes(name),
    );
  }

  return { message: "Query not understood" };
};;;

module.exports = { processQuery };
