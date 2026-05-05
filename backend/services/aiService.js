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
    return {
      reasoning:
        "Tasks are considered risks if they are delayed and not completed",
      data: risks,
    };
  }

  if (question.includes("dependency") || question.includes("blocked")) {
    let risks = [];

    relationships.forEach((rel) => {
      if (rel.predicate === "DEPENDS_ON") {
        const parent = tasks.find((t) => t.id === rel.object);
        const child = tasks.find((t) => t.id === rel.subject);

        if (parent.status === "delayed") {
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


  // project tasks
  if (question.includes("project")) {
    const name = question.split("project")[1]?.trim();
    return tasks.filter((t) => t.project.toLowerCase().includes(name));
  }

  return { message: "Query not understood" };
};;

module.exports = { processQuery };
