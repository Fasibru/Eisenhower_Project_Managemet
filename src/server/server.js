import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import https from 'https';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import '../config/passport-config';

import apiRouter from './routes/apiRoutes';
import accountRoutes from './routes/accountRoutes';
import verifyJWT from './customMiddleware/customMiddleware';

const portConfig = JSON.parse(fs.readFileSync('src/config/port-config.json'))[0];
const PORT = process.env.PORT || portConfig.BACKEND_SERVER_PORT;
const mongoDatabaseURL = process.env.DB_URL;
const MongoStore = connectMongo(session);

// initiate mongoose connection
mongoose.connect(mongoDatabaseURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Session
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  proxy: true,
  cookie: {
    secure: true,
    sameSite: true,
  },
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
