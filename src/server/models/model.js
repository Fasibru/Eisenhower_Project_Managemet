import { Schema } from 'mongoose';

const TasksSchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now,
  },
});

export default TasksSchema;
