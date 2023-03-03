import Router from 'express';
import auth from '../middleware/auth.js';

import { User } from '../models/User.js';

const router = Router();

router.post('/', auth, async (req, res) => {
  const { type, amount, text } = req.body;

  const userID = req.user._id;
  const user = User.findById(userID);

  let newCarbon = 0;
  let logs = user.logs;

  if (type == 0) {
    newCarbon = user.carbon + amount;
  } else {
    newCarbon = user.carbon - amount;
  }

  logs.push({
    type,
    amount,
    text,
  });

  const newUser = await User.findByIdAndUpdate(userID, {
    carbon: newCarbon,
    logs: logs,
  });

  res.send({ success: true, newUser });
});
