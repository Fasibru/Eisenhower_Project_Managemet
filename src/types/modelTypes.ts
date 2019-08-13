import { Document } from 'mongoose';

export interface TasksSchemaType extends Document {
  rank: number;
  category: string;
  title: string;
  description: string;
  completed: boolean;
  date: Date;
  members: string[];
}

export interface FiltersSchemaType extends Document {
  userID: string;
  showTasks: string;
  dateRangeStart: Date;
  dateRangeEnd: Date;
  dateRangeEndDefaultToday: boolean;
}

export interface UserSchemaType extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  password: string;
  tokenSalt: string;
}
