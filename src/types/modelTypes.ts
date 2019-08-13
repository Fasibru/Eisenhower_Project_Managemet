import { Document } from 'mongoose';

export interface UserSchemaType extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  password: string;
  tokenSalt: string;
}
