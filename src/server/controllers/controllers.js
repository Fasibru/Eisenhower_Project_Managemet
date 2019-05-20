import mongoose from 'mongoose';
import { TasksSchema } from '../models/model';

// create 'Tasks' collection by leveraging the TasksSchema
const Tasks = mongoose.model('Tasks', TasksSchema);

// for POST endpoint to create new task
export const addNewTask = (req, res) => {
  const newTask = new Tasks(req.body);
  newTask.save((err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

// for PUT endpoint to edit task
export const editTask = (req, res) => {
  Tasks.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
    if (err) {
      res.send(err);
    }
    res.send(`Successfully updated task ${req.params.id}`);
  });
};

// for GET all tasks endpoint
export const getTasks = (req, res) => {
  Tasks.find({}, (err, tasks) => {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
};

// for DELETE endpoint to delete a single task
export const deleteTask = (req, res) => {
  Tasks.findOneAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      res.send(err);
    }
    res.send(`Successfully removed task ${req.params.id}`);
  });
};
