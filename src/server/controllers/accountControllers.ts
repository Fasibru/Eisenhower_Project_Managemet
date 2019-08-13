// tslint:disable: no-shadowed-variable
import 'dotenv/config';

import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
// tslint:disable-next-line: import-name
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import passport from 'passport';

import { FiltersSchemaType, TasksSchemaType, UserSchemaType } from '../../types/modelTypes';
import { FiltersSchema, TasksSchema, UserSchema } from '../models/model';

const portConfig = JSON.parse(fs.readFileSync('src/config/port-config.json').toString())[0];

const secret = process.env.SECRET;
const saltRounds = 12;

// tslint:disable: variable-name
const User = mongoose.model<UserSchemaType>('Users', UserSchema);
const Tasks = mongoose.model<TasksSchemaType>('Tasks', TasksSchema);
const Filters = mongoose.model<FiltersSchemaType>('Filters', FiltersSchema);
// tslint:enable: variable-name

export const registerUser = (req: Request, res: Response) => {
  User.findOne({ emailAddress: req.body.emailAddress })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          return res.status(500)
            .json({ message: `Something went wrong. Please try again. Error: ${err}` });
        }
        const newUser = new User({
          emailAddress: req.body.emailAddress,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: hash,
          userName: req.body.emailAddress.split('@')[0],
        });
        newUser.save()
          .then((user) => {
            req.session.userId = user._id;
            const payload = {
              id: user._id,
            };

            jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' }, (err, token) => {
              if (err) {
                res.status(500)
                  .json({ message: `Something went wrong. Please try again. Error: ${err}` });
              }
              const cookieOptions = {
                httpOnly: true,
                sameSite: true,
                secure: true,
              };

              const authCookieName = process.env.AUTH_COOKIE_NAME;

              if (process.env.NODE_ENV === 'development') {
                res.set(
                  'Access-Control-Allow-Origin',
                  `http://localhost:${portConfig.DEV_FRONTEND_SERVER_PORT}`,
                );
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
            res.status(500)
              .json({ message: `Something went wrong. Please try again. Error: ${err}` });
          });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: `Something went wrong. Please try again. Error: ${err}` });
    });
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
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
        sameSite: true,
        secure: true,
      };
      const authCookieName = process.env.AUTH_COOKIE_NAME;

      if (process.env.NODE_ENV === 'development') {
        res.set(
          'Access-Control-Allow-Origin',
          `http://localhost:${portConfig.DEV_FRONTEND_SERVER_PORT}`,
        );
      }

      res
        .cookie(authCookieName, token, cookieOptions)
        .status(200)
        .json({
          emailAddress: user.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          userId: user._id,
        });
    });
  })(req, res, next);
};

export const getUser = (req: Request, res: Response) => {
  User.findOne({ _id: req.session.userId }, {
    emailAddress: 1,
    firstName: 1,
    lastName: 1,
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
        error: err,
        message: 'Server error while querying user.',
      });
    });
};

export const logoutUser = (req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    sameSite: true,
    secure: true,
  };

  const authCookieName = process.env.AUTH_COOKIE_NAME;

  req.session.destroy(() => {
    res.clearCookie(authCookieName, cookieOptions);
    res.clearCookie('sid', cookieOptions);
    res.sendStatus(200);
  });
};

export const deleteUser = (req: Request, res: Response) => {
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
              // console.log(err);
              return res.status(500).json({
                error: err,
                message: 'Something went wrong while deleting the tasks. Please try again.',
              });
            });
          res.status(200);
        })
        .catch((err) => {
          // console.log(err);
          return res.status(500).json({
            error: err,
            message: 'Something went wrong while updating the tasks. Please try again.',
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
          // console.log(err);
          return res.status(500).json({
            error: err,
            message: 'Something went wrong while deleting the filters. Please try again.',
          });
        });
    })
    // 5. delete cookies and destroy session
    .then(() => {
      const cookieOptions = {
        httpOnly: true,
        sameSite: true,
        secure: true,
      };

      const authCookieName = process.env.AUTH_COOKIE_NAME;

      req.session.destroy(() => {
        res.clearCookie(authCookieName, cookieOptions);
        res.clearCookie('sid', cookieOptions);
        res.sendStatus(200);
      });
    })
    .catch((err) => {
      // console.log(err);
      return res.status(500).json({
        error: err,
        message: 'Something went wrong while deleting the user. Please try again.',
      });
    });
};
