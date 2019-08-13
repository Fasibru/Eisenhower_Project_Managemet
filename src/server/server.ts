// tslint:disable: no-console
import 'dotenv/config';

import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
// tslint:disable-next-line: import-name
import session from 'express-session';
import fs from 'fs';
import https from 'https';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';

import '../config/passport-config';

// tslint:disable-next-line: import-name
import verifyJWT from './customMiddleware/customMiddleware';
import accountRoutes from './routes/accountRoutes';
// tslint:disable-next-line: import-name
import apiRouter from './routes/apiRoutes';

const portConfig = JSON.parse(fs.readFileSync('src/config/port-config.json').toString())[0];
const PORT = process.env.PORT || portConfig.BACKEND_SERVER_PORT;
const mongoDatabaseURL = process.env.DB_URL;
// tslint:disable-next-line: variable-name
const MongoStore = connectMongo(session);

// initiate mongoose connection
mongoose.connect(mongoDatabaseURL, {
  useFindAndModify: false,
  useNewUrlParser: true,
})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((err) => {
    throw new Error(err);
  });

const app = express();

// Session
app.use(session({
  cookie: {
    sameSite: true,
    secure: true,
  },
  name: 'sid',
  proxy: true,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// CORS
app.use(cors());

app.use(cookieParser(process.env.SECRET));

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

// to serve files from production build:
app.use(express.static(path.resolve(__dirname, '../../dist')));

app.use('/api', verifyJWT, apiRouter);
app.use('/account', accountRoutes);

// serve index.html so react-router-dom works without 404 error
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => console.log(
    `${process.env.NODE_ENV} HTTP Express server is running on port:${PORT}`
  ));
} else if (process.env.NODE_ENV === 'development') {
  const httpsOptions = {
    cert: fs.readFileSync('security/cert.pem'),
    key: fs.readFileSync('security/cert.key'),
  };
  https.createServer(httpsOptions, app)
    .listen(PORT, () => console.log(
      `${process.env.NODE_ENV} HTTPS Express backend server is running on port:${PORT}.`
      + `\nFrontend dev server running on port:${portConfig.DEV_FRONTEND_SERVER_PORT}`
      + ` --> https://localhost:${portConfig.DEV_FRONTEND_SERVER_PORT}`));
} else {
  console.log('process.env.NODE_ENV neither set to production nor development');
}
