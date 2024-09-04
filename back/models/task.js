const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  extraNotes: { type: String, default: '' },
  isDone: { type: Boolean, default: false },
  date: { type: Date, required: true }
});


module.exports = mongoose.model('Task', taskSchema);