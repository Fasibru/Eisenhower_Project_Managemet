import { Schema } from 'mongoose';
import { stringify } from 'querystring';

export const TasksSchema = new Schema({
  rank: {
    type: Number,
    default: -999,
  },
  category: {
    type: String,
    required: 'Provide valid category',
  },
  title: {
    type: String,
    required: 'Provide a title',
  },
  description: {
    type: String,
    required: 'Provide a description',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const FilterSchema = new Schema({
  showCompleted: {
    type: String,
    default: 'yes',
  },
});
