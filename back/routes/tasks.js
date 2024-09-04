const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

router.get('/', TaskController.getAllTasks);
router.get('/:userId', TaskController.getTasksByUser)
router.post('/', TaskController.createTask);
router.post('/:userId', TaskController.createTaskByUserId)
router.put('/:id', TaskController.updateTask);
router.get('/by-date-range', TaskController.getTasksByDateRange);
router.get('/by-date-range/:userId', TaskController.getTasksByDateRangeByUserId);
module.exports = router;
