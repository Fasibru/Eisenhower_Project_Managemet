import 'dotenv/config';
import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import { UserSchema, TasksSchema, FiltersSchema } from '../models/model';

const portConfig = JSON.parse(fs.readFileSync('src/config/port-config.json'))[0];

const secret = process.env.SECRET;
const saltRounds = 12;

const User = mongoose.model('Users', UserSchema);
const Tasks = mongoose.model('Tasks', TasksSchema);
const Filters = mongoose.model('Filters', FiltersSchema);

export const registerUser = (req, res) => {
  User.findOne({ emailAddress: req.body.emailAddress })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: `Something went wrong. Please try again. Error: ${err}` });
        }
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.emailAddress.split('@')[0],
          emailAddress: req.body.emailAddress,
          password: hash,
        });
        newUser.save()
          .then((user) => {
            req.session.userId = user._id;
            const payload = {
              id: user._id,
            };

            jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' }, (err, token) => {
              if (err) {
                res.status(500).json({ message: `Something went wrong. Please try again. Error: ${err}` });
              }
              const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: true,
              };

              const authCookieName = process.env.AUTH_COOKIE_NAME;

              if (process.env.NODE_ENV === 'development') {
                res.set('Access-Control-Allow-Origin', `http://localhost:${portConfig.DEV_FRONTEND_SERVER_PORT}`);
              }
              res.cookie(authCookieName, token, cookieOptions);
            });

            // initialize filters with defaults for user
            const filters = new Filters({
              userID: user._id,
            });
            filters.save((err, filter) => {
              if (err) {
                res.status(500).send(err);
              }
              res.status(200).json({
                filter,
                user,
              });
            });
          })
          .catch((err) => {
            res.status(500).json({ message: `Something went wrong. Please try again. Error: ${err}` });
          });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: `Something went wrong. Please try again. Error: ${err}` });
    });
};

export const loginUser = (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      res.status(500).json({
        message: `Something went wrong. Please try again. \nError: ${err}`,
      });
    }
    if (info) {
      res.status(info.status).json({
        message: info.message,
      });
    }

    req.session.userId = user._id;

    const payload = {
      id: user._id,
    };

    jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' }, (err, token) => {
      if (err) {
        res.status(500).json({ message: `Something went wrong. Please try again. Error: ${err}` });
      }
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: true,
      };
      const authCookieName = process.env.AUTH_COOKIE_NAME;

      if (process.env.NODE_ENV === 'development') {
        res.set('Access-Control-Allow-Origin', `http://localhost:${portConfig.DEV_FRONTEND_SERVER_PORT}`);
      }

      res
        .cookie(authCookieName, token, cookieOptions)
        .status(200)
        .json({
          firstName: user.firstName,
          lastName: user.lastName,
          userId: user._id,
          emailAddress: user.emailAddress,
        });
    });
  })(req, res, next);
};

export const getUser = (req, res) => {
  User.findOne({ _id: req.session.userId }, {
    firstName: 1,
    lastName: 1,
    emailAddress: 1,
  })
    .then((user) => {
      if (user) {
        return res.status(200).json(user);
      }
      return res.status(404).json({
        message: 'User not found.',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Server error while querying user.',
        error: err,
      });
    });
};

export const logoutUser = (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: true,
  };

  const authCookieName = process.env.AUTH_COOKIE_NAME;

  req.session.destroy(() => {
    res.clearCookie(authCookieName, cookieOptions);
    res.clearCookie('sid', cookieOptions);
    res.sendStatus(200);
  });
};

export const deleteUser = (req, res) => {
  // 1. delete User
  User.deleteOne({ _id: req.session.userId })
    .then(() => {
      // 2. delete userId from members in Tasks
      Tasks.updateMany(
        { members: { $in: [req.session.userId] } },
        { $pull: { members: req.session.userId } },
      )
        .then(() => {
          // 3. delete tasks where members is empty
          Tasks.deleteMany({ members: [] })
            .then(() => {
              res.status(200);
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({
                error: err,
                message: 'Something went wrong while deleting the tasks. Please try again.',
              });
            });
          res.status(200);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            message: 'Something went wrong while updating the tasks. Please try again.',
            error: err,
          });
        });
    })
    // 4. delete user filters
    .then(() => {
      Filters.deleteOne({ userID: req.session.userId })
        .then(() => {
          res.status(200);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            message: 'Something went wrong while deleting the filters. Please try again.',
            error: err,
          });
        });
    })
    // 5. delete cookies and destroy session
    .then(() => {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: true,
      };

      const authCookieName = process.env.AUTH_COOKIE_NAME;

      req.session.destroy(() => {
        res.clearCookie(authCookieName, cookieOptions);
        res.clearCookie('sid', cookieOptions);
        res.sendStatus(200);
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
        message: 'Something went wrong while deleting the user. Please try again.',
      });
    });
};
