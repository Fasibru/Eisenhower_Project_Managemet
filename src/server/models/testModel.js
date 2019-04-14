import { Schema } from 'mongoose';

const TestSchema = new Schema({
  testString: {
    type: String,
    required: 'Enter a string',
  },
  testNumber: {
    type: Number,
    required: 'Enter a number',
  },
  testDate: {
    type: Date,
    default: Date.now,
  },
});

export default TestSchema;
