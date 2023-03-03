import config from '../config.js';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js';
import tasksRouter from './routes/tasks.js';

try {
  mongoose.connect(config.MONGODB_URI, {}).then(() => {
    console.log('MongoDB connected');
  });
} catch (e) {
  console.log(e);
}

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.header('Origin'));
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth-token, Authorization'
  );
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.port, () => {
  console.log('Server is running on port ' + config.port);
});
