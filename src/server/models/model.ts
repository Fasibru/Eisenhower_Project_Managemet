// tslint:disable: object-literal-sort-keys
// tslint:disable: variable-name
import { Schema } from 'mongoose';
// tslint:disable-next-line: import-name
import uuid from 'uuid-random';

export const TasksSchema: Schema = new Schema({
  rank: {
    type: Number,
    default: -999,
  },
  category: {
    type: String,
    default: 'A',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  members: {
    type: [{ type: String }],
    default: null,
  },
});

export const FiltersSchema: Schema = new Schema({
  userID: {
    type: String,
    default: '-999',
  },
  showTasks: {
    type: String,
    default: 'all',
  },
  dateRangeStart: {
    type: Date,
    default: Date.now,
  },
  dateRangeEnd: {
    type: Date,
    default: Date.now,
  },
  dateRangeEndDefaultToday: {
    type: Boolean,
    default: false,
  },
});

export const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokenSalt: {
    type: String,
    default: uuid(),
  },
});


// // tslint:disable: object-literal-sort-keys
// // tslint:disable: variable-name
// import { Schema } from 'mongoose';
// // tslint:disable-next-line: import-name
// import uuid from 'uuid-random';

// export const TasksSchema: Schema = new Schema({
//   rank: {
//     type: Number,
//     default: -999,
//   },
//   category: {
//     type: String,
//     default: 'A',
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   members: {
//     type: [{ type: String }],
//     default: null,
//   },
// });

// export const FiltersSchema: Schema = new Schema({
//   userID: {
//     type: String,
//     default: '-999',
//   },
//   showTasks: {
//     type: String,
//     default: 'all',
//   },
//   dateRangeStart: {
//     type: Date,
//     default: Date.now,
//   },
//   dateRangeEnd: {
//     type: Date,
//     default: Date.now,
//   },
//   dateRangeEndDefaultToday: {
//     type: Boolean,
//     default: false,
//   },
// });

// export const UserSchema: Schema = new Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   userName: {
//     type: String,
//     required: true,
//   },
//   emailAddress: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   tokenSalt: {
//     type: String,
//     default: uuid(),
//   },
// });
