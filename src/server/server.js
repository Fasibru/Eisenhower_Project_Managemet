import 'dotenv/config';
import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import '../config/passport-config';
import jwt from 'jsonwebtoken';

import apiRouter from './routes/apiRoutes';
import accountRoutes from './routes/accountRoutes';

const portConfig = JSON.parse(fs.readFileSync('src/config/port-config.json'))[0];

const verifyJWT = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  if (req.headers['authorization'] === undefined) {
    res.sendStatus(403);
    // eslint-disable-next-line dot-notation
  } else if (req.headers['authorization'].split(' ')[0] === 'Bearer') {
    // eslint-disable-next-line dot-notation
    const bearerToken = req.headers['authorization'].split(' ')[1];
    jwt.verify(bearerToken, 'jd7!_F1#22aFH+6234aFJ?e8912lfd4af7_xb', (err, authData) => {
      if (err) {
        res.status(403).json({ message: err });
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

const app = express();
const PORT = process.env.PORT || portConfig.BACKEND_SERVER_PORT;
const mongoDatabaseURL = process.env.DB_URL;

// initiate mongoose connection
mongoose.connect(mongoDatabaseURL, { useNewUrlParser: true })
  .then(() => console.log(`Connected to mongodb: ${mongoDatabaseURL}`))
  .catch((err) => {
    console.log(err);
  });

// CORS
app.use(cors());

app.use(cookieParser());

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

// app.use('/api', verifyJWT, apiRouter);
app.use('/api', apiRouter);
app.use('/account', accountRoutes);

// to serve files from production build:
app.use(express.static(path.resolve(__dirname, '../../dist')));

// serve index.html so react-router-dom works without 404 error
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => console.log(`${process.env.NODE_ENV} HTTP Express server is running on port:${PORT}`));
} else if (process.env.NODE_ENV === 'development') {
  const httpsOptions = {
    key: fs.readFileSync('security/cert.key'),
    cert: fs.readFileSync('security/cert.pem'),
  };
  https.createServer(httpsOptions, app)
    .listen(PORT, () => console.log(`${process.env.NODE_ENV} HTTPS Express backend server is running on port:${PORT}.\nFrontend dev server running on port:${portConfig.DEV_FRONTEND_SERVER_PORT} --> https://localhost:${portConfig.DEV_FRONTEND_SERVER_PORT}`));
} else {
  console.log('process.env.NODE_ENV neither set to production nor development');
}
