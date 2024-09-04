const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');


router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.get('/by-date-range', TaskController.getTasksByDateRange);
module.exports = router;
