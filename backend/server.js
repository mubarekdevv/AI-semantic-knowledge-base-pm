
const express = require('express');
const cors = require('cors');

const taskRoutess = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', taskRoutess);






// Query AI
app.post('/query', (req, res) => {
  const question = req.body.question.toLowerCase();

  if (question.includes("delay")) {
    const result = tasks.filter(t =>
      new Date(t.deadline) < new Date() && t.status !== "done"
    );
    return res.json(result);
  }

  if (question.includes("risk")) {
    const result = tasks.filter(t =>
      new Date(t.deadline) < new Date() && t.status !== "done"
    );
    return res.json({ risks: result });
  }

  if (question.includes("project")) {
    const name = question.split("project")[1]?.trim();
    const result = tasks.filter(t =>
      t.project.toLowerCase().includes(name)
    );
    return res.json(result);
  }

  res.json({ message: "I don't understand the query" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});