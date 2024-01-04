const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// POST route that replies with a simple JSON response
app.get('/api/reply', (req, res) => {
  res.json({ reply: `Hello` });
});

const port = 8082;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
