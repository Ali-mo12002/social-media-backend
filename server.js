const express = require('express');
const db = require('./config/db');
const routes = require('./routes');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3001;

// Routes
app.use(bodyParser.json());

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`running on port ${PORT}!`);
    });
  });