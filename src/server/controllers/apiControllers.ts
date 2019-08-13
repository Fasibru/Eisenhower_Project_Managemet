import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { FiltersSchemaType, TasksSchemaType } from '../../types/modelTypes';
import { FiltersSchema, TasksSchema } from '../models/model';

// create collections by leveraging the Schemas
// tslint:disable: variable-name
const Filters = mongoose.model<FiltersSchemaType>('Filters', FiltersSchema);
const Tasks = mongoose.model<TasksSchemaType>('Tasks', TasksSchema);
// tslint:enable: variable-name

// for POST endpoint to create new task
export const addNewTask = (req: Request, res: Response) => {
  const newTask = new Tasks(req.body);
  newTask.save((err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

// for PUT endpoint to edit task
export const editTask = (req: Request, res: Response) => {
  Tasks.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err) => {
    if (err) {
      res.send(err);
    }
    res.send(`Successfully updated task ${req.params.id}`);
  });
};

// for GET endpoint for all tasks
export const getTasks = (req: Request, res: Response) => {
  Tasks.find({}, (err, tasks) => {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
};

// for GET endpoint for user specific tasks
export const getUserTasks = (req: Request, res: Response) => {
  Tasks.find({ members: req.params.userId }, (err, tasks) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json(tasks);
  });
};

// for DELETE endpoint to delete a single task
export const deleteTask = (req: Request, res: Response) => {
  Tasks.findOneAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      res.send(err);
    }
    res.send(`Successfully removed task ${req.params.id}`);
  });
};

// for GET endpoint to get filter settings
export const getFilters = (req: Request, res: Response) => {
  Filters.find({}, (err, filters) => {
    if (err) {
      res.send(err);
    }
    res.json(filters);
  });
};

export const getUserFilters = (req: Request, res: Response) => {
  Filters.find({ userID: req.params.userId }, (err, filters) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json(filters);
  });
};

// for PUT endpoint to update filter settings
export const updateFilters = (req: Request, res: Response) => {
  // update filter settings
  Filters.findOneAndUpdate({ userID: req.params.userId }, req.body, (err) => {
    if (err) {
      res.send(err);
    }
    res.end();
  });
};
