import mongoose from 'mongoose';
import TasksSchema from '../models/model';

// create 'Tasks' collection by leveraging the TasksSchema
const Tasks = mongoose.model('Tasks', TasksSchema);

// for POST endpoint
export const addNewTask = (req, res) => {
  const newTask = new Tasks(req.body);
  newTask.save((err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

// for GET endpoint
export const getTasks = (req, res) => {
  Tasks.find({}, (err, tasks) => {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
};
