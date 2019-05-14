import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import os from 'os';

import apiRouter from './routes/routes';

const app = express();
const PORT = process.env.PORT || 8080;
const mongoDatabaseURL = process.env.DB_URL;

// initiate mongoose connection
mongoose.connect(mongoDatabaseURL, { useNewUrlParser: true })
  .then(() => console.log(`Connected to mongodb: ${mongoDatabaseURL}`))
  .then(
    // CORS
    app.use(cors()),

    // bodyParser setup
    app.use(bodyParser.urlencoded({ extended: true })),
    app.use(bodyParser.json()),

    // routes(app);
    app.use('/api', apiRouter),

    // to serve files from production build:
    app.use(express.static('dist')),

    // app.get('/', (req, res) => res.send('test')),

    // app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username })),

    app.listen(PORT, () => console.log(`Express server is running on port:${PORT}`)),
  )
  .catch(() => console.error());
