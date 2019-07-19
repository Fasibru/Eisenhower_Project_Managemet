import 'dotenv/config';
import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserSchema } from '../models/model';

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

    const payload = {
      id: user._id,
    };

    jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' }, (err, token) => {
      if (err) {
        res.status(500).json({ message: `Something went wrong. Please try again. Error: ${err}` });
      }
      let cookieOptions;
      if (process.env.NODE_ENV === 'production') {
        cookieOptions = {
          httpOnly: true,
          secure: false,
        };
      } else if (process.env.NODE_ENV === 'development') {
        cookieOptions = {
          httpOnly: true,
          secure: true,
        };
        res.set('Access-Control-Allow-Origin', `http://localhost:${process.env.DEV_SERVER_PORT}`);
      }
      res.cookie('JWT', token, cookieOptions).sendStatus(200);
    });
  })(req, res, next);
};
