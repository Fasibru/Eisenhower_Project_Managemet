import 'dotenv/config';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { UserSchema } from '../server/models/model';

const User = mongoose.model('Users', UserSchema);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'emailAddress',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      User.findOne({ emailAddress: username })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: 'User not found.',
              status: 404,
            });
          }
          bcrypt.compare(password, user.password)
            .then((match) => {
              if (match !== true) {
                return done(null, false, {
                  message: 'Password is incorrect.',
                  status: 401,
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
