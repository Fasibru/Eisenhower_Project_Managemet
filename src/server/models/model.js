import { Schema } from 'mongoose';

const TasksSchema = new Schema({
  id: {
    type: Number,
    required: 'Provide a valid ID',
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
    required: 'Provide a description'
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default TasksSchema;
