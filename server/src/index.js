import config from '../config.js';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './routes/auth.js';
import tasksRouter from './routes/tasks.js';
import leaderboardRouter from './routes/leaderboard.js';
import carbonRouter from './routes/carbon.js';
import activityRouter from './routes/activity.js';

try {
  mongoose.connect(config.MONGODB_URI, {}).then(() => {
    console.log('MongoDB connected');
  });
} catch (e) {
  console.log(e);
}

const app = express();

app.use(
  cors({
    origin: 'https://carboclear.vercel.app',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/carbon', carbonRouter);
app.use('/activity', activityRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.port, () => {
  console.log('Server is running on port ' + config.port);
});
