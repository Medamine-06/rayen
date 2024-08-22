const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a task
const taskSchema = new Schema({
    Tasks: {
    type: [String],  // Array of strings to represent tasks
    required: true
  },
   ExtraNote: {
    type: [String],  // Array of strings to represent tasks
    required: true
  },
  IsDone: {
    type: Boolean,  // Boolean to mark if the task is done
    default: false
  },
  Date: {
    type: Date,
    required: true
  }
  
});

// Create and export the model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
