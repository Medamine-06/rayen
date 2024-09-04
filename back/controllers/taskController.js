const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getTasksByUser = async (req,res) => {
  const userId = req.params.userId;
  try {
    const tasks = await Task.find({userId:userId});
    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getTasksByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Missing startDate or endDate" });
  }

  try {
    const tasks = await Task.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasksByDateRangeByUserId = async (req, res) => {
  const userId = req.params.userId;
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Missing startDate or endDate" });
  }

  try {
    const tasks = await Task.find({
      userId:userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const { task, extraNotes, isDone, date } = req.body;
  try {
    const newTask = new Task({
      task: task || '',
      extraNotes: extraNotes || '',
      isDone: isDone !== undefined ? isDone : false,
      date
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createTaskByUserId = async (req, res) => {
  const userId = req.params.userId;
  const { task, extraNotes, isDone, date } = req.body;
  try {
    const newTask = new Task({
      userId:userId,
      task: task || '',
      extraNotes: extraNotes || '',
      isDone: isDone !== undefined ? isDone : false,
      date
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, extraNotes, isDone, date } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        task: task || '',
        extraNotes: extraNotes || '',
        isDone: isDone !== undefined ? isDone : false,
        date
      },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllTasks, createTask, updateTask, getTasksByDateRange, getTasksByUser, createTaskByUserId, getTasksByDateRangeByUserId };
