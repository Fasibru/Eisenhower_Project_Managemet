import 'dotenv/config';
import mongoose from 'mongoose';
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

export const loginUser = (req, res) => {
  const { emailAddress } = req.body;
  User.findOne({ emailAddress })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((match) => {
          if (match) {
            const payload = {
              id: user._id,
              emailAddress: user.emailAddress,
            };
            jwt.sign(payload, secret, (err, token) => {
              if (err) {
                res.status(500).json({ message: `Something went wrong. Please try again. Error: ${err}` });
              } else {
                res.status(200).json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              }
            });
          } else {
            res.status(400).json({ message: 'Password is incorrect.' });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: `Something went wrong. Please try again. Error: ${err}` });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: `Something went wrong. Please try again. Error: ${err}` });
    });
};
