require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const auth = require('./routes/auth');
const tasks = require('./routes/tasks');
const cors = require('cors');
const path = require('path');

// Read VITE_PORT from .env file
const frontEndPort = process.env.VITE_PORT || 5175;

app.use(cors({
  origin: `http://localhost:${frontEndPort}`,
  credentials: true
}));

console.log('port:', process.env.VITE_PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    console.error("Database connection error");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/tasks', tasks); 
app.use(express.static('dist'));

// Define your dynamic routes after the static middleware
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`Server started on localhost port ${process.env.PORT || 3000}`);
});
