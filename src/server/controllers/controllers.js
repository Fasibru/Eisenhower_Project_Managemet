import mongoose from 'mongoose';
import TasksSchema from '../models/model';

// create 'Dummy' collection by leveraging the TasksSchema
const Dummy = mongoose.model('Dummy', TasksSchema);

// for POST endpoint
export const addNewDummy = (req, res) => {
  const newDummy = new Dummy(req.body);
  newDummy.save((err, dummy) => {
    if (err) {
      res.send(err);
    }
    res.json(dummy);
  });
};

// for GET endpoint
export const getDummies = (req, res) => {
  Dummy.find({}, (err, dummies) => {
    if (err) {
      res.send(err);
    }
    res.json(dummies);
  });
};
