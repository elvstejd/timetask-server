const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


router.get('/', async (req, res) => {
    const tasks = await Task.find();
    const parsedTasks = tasks.map(task => {
        const taskData = task._doc;
        console.log(taskData);
        return {
            id: taskData._id,
            title: taskData.title,
            duration: taskData.duration,
            done: taskData.done,
            completionDate: taskData.completionDate
        }
    });
    res.json(parsedTasks).status(200);
});

router.post('/', async (req, res) => {
    const task = new Task(req.body);
    console.log('received request for task');
    try {
        const result = await task.save();
        console.log(result);
        res.json({ created: true, id: result._id }).status(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.patch('/:id', async (req, res) => {
    const updates = req.body;

    try {
        const doc = await Task.findByIdAndUpdate({ _id: req.params.id }, updates);
        const result = await doc.save();
        console.log(result);
        res.json({ 'updated': true }).status(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Task.deleteOne({ _id: req.params.id });
        console.log(result);
        res.json({ deleted: true }).status(200);
    } catch (err) {
        res.sendStatus(500);
        console.log(err);
    }
});

router.delete('/', async (req, res) => {
    const query = req.body;
    if (!query.done) {
        return res.sendStatus(400);
    }
    try {
        const result = await Task.deleteMany(query);
        console.log(result);
        res.json({ deleted: true }).status(200);
    } catch (err) {
        res.sendStatus(500);
        console.log(err);
    }
});

module.exports = router;
