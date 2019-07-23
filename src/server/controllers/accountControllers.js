import 'dotenv/config';
import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import { UserSchema } from '../models/model';
import { getConsoleOutput } from '@jest/console';

const portConfig = JSON.parse(fs.readFileSync('src/config/port-config.json'))[0];

const secret = process.env.SECRET;
const saltRounds = 12;

const User = mongoose.model('Users', UserSchema);

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
            res.status(200).json({ message: `User ${user.emailAddress} successfully registered.` });
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
        secure: process.env.NODE_ENV === 'development',
        sameSite: true,
      };
      if (process.env.NODE_ENV === 'development') {
        res.set('Access-Control-Allow-Origin', `http://localhost:${portConfig.DEV_FRONTEND_SERVER_PORT}`);
      }
      res.cookie('JSONWebToken', token, cookieOptions).sendStatus(200);
    });
  })(req, res, next);
};

export const getUserId = (req, res) => {
  res.status(200).json(req.session.userId);
};

export const logoutUser = (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    sameSite: true,
  };
  res.clearCookie('JSONWebToken', cookieOptions);
  res.clearCookie('sid', cookieOptions); // need to end session to clear the sid cookie automatically?
  res.sendStatus(200);
};
