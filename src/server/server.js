import 'dotenv/config';
import express from 'express';
import https from 'https';
import fs from 'fs';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import './config/passport-config';
import jwt from 'jsonwebtoken';

import apiRouter from './routes/apiRoutes';
import accountRoutes from './routes/accountRoutes';

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
      }
      else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

console.log(process.cwd());

const httpsOptions = {
  key: fs.readFileSync('security/cert.key'),
  cert: fs.readFileSync('security/cert.pem'),
};

const app = express();
const PORT = process.env.PORT || 8080;
const mongoDatabaseURL = process.env.DB_URL;


// initiate mongoose connection
mongoose.connect(mongoDatabaseURL, { useNewUrlParser: true })
  .then(() => console.log(`Connected to mongodb: ${mongoDatabaseURL}`))
  .catch((err) => {
    console.log(err);
  });

// CORS
app.use(cors({ credentials: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type');
  res.header('Vary', 'Origin');
  next();
});

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

// app.use('/api', verifyJWT, apiRouter);
app.use('/api', apiRouter);
app.use('/account', accountRoutes);

// to serve files from production build:
app.use(express.static('dist'));

https.createServer(httpsOptions, app)
  .listen(PORT, () => console.log(`Express server is running on port:${PORT}`));
