const express = require('express');
const mongoose = require('mongoose');
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const port = 8082;

mongoose.connect('mongodb://127.0.0.1:27017/action-character', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', videoRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
