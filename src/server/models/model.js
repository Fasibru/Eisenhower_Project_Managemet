import { Schema } from 'mongoose';

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

export const FiltersSchema = new Schema({
  userID: {
    type: Number,
    default: -999,
  },
  showTasks: {
    type: String,
    default: 'all',
  },
});
