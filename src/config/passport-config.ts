import 'dotenv/config';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { UserSchema } from '../server/models/model';

import { UserSchemaType } from '../types/modelTypes';

declare module 'passport-local' {
  interface IVerifyOptions {
    status: number;
  }
}

const userEntry = mongoose.model<UserSchemaType>('Users', UserSchema);

passport.use(
  'login',
  new LocalStrategy(
    {
      passwordField: 'password',
      session: false,
      usernameField: 'emailAddress',
    },
    (username, password, done) => {
      userEntry.findOne({ emailAddress: username })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Sorry, we couldn't find you with the provided email and password.",
              status: 404,
            });
          }
          bcrypt.compare(password, user.password)
            .then((match) => {
              if (!match) {
                return done(null, false, {
                  message: "Sorry, we couldn't find you with the provided email and password.",
                  status: 404,
                });
              }
              return done(null, user);
            })
            .catch(err => done(err));
        })
        .catch(err => done(err));
    },
  ),
);
