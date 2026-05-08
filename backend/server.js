
const express = require('express');
const cors = require('cors');

const taskRoutess = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', taskRoutess);








app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});