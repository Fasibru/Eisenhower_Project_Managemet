import mongoose from 'mongoose';
import TestSchema from '../models/testModel';

// create 'Dummy' collection by leveraging the TestSchema
const Dummy = mongoose.model('Dummy', TestSchema);

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
