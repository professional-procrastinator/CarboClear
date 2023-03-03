import Router from 'express';
import auth from '../middleware/auth.js';

import { User } from '../models/User.js';

const router = Router();

router.get('/international', auth, async (req, res) => {
  //descending order of points, international - country does not matter
  const users = await User.find({})
    .sort({ points: -1 })
    .lean()
    .limit(10)
    .select('-password');

  res.send({ success: true, users });
});

router.get('/national', auth, async (req, res) => {
  //descending order of points, national - country matters
  const user = await User.findById(req.user._id).lean();
  const users = await User.find({ country: user.country })
    .sort({ points: -1 })
    .lean()
    .limit(10)
    .select('-password');

  res.send({ success: true, users });
});

export default router;
