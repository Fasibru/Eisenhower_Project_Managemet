import mongoose from 'mongoose';
import { TasksSchema, FiltersSchema } from '../models/model';

// create collections by leveraging the Schemas
const Tasks = mongoose.model('Tasks', TasksSchema);
const Filters = mongoose.model('Filters', FiltersSchema);

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
  Tasks.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err) => {
    if (err) {
      res.send(err);
    }
    res.send(`Successfully updated task ${req.params.id}`);
  });
};

// for GET endpoint for all tasks
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


// for POST endpoint to initialize filters
// export const setFilters = (req, res) => {
//   const filters = new Filters(req.body);
//   filters.save((err, filter) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(filter);
//   });
// };

// for GET endpoint to get filter settings
export const getFilters = (req, res) => {
  Filters.find({}, (err, filters) => {
    if (err) {
      res.send(err);
    }
    res.json(filters);
  });
};

// for PUT endpoint to update filter settings
export const updateFilters = (req, res) => {
  // update filter settings
  Filters.findOneAndUpdate({ userID: -999 }, req.body, (err) => {
    if (err) {
      res.send(err);
    }
    res.end();
  });
};
