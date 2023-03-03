import Router from 'express';
import auth from '../middleware/auth.js';
import tasks from '../../utils/tasks.js';

import { User } from '../models/User.js';

const router = Router();

router.post('/complete/:id', auth, async (req, res) => {
  const { id } = req.params;

  let task = tasks.find((task) => task.id == id);

  console.log(task);

  const userID = req.user._id;

  const user = await User.findById(userID);

  let newPoints = user.points + task.points;

  const newUser = await User.findByIdAndUpdate(userID, {
    points: newPoints,
  });

  res.send({ success: true, newUser });
});

router.get('/', async (req, res) => {
  let threeRandomTasks = [];
  for (let i = 0; i < 3; i++) {
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    threeRandomTasks.push(randomTask);
  }

  res.send({ success: true, tasks: threeRandomTasks });
});

export default router;
