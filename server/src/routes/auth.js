import Router from 'express';
import auth from '../middleware/auth.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../../utils/validateEmail.js';
import getInitials from '../../utils/getInitials.js';

import { User } from '../models/User.js';

import config from '../../config.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (
    email == undefined ||
    !email ||
    email.trim() == '' ||
    password == undefined ||
    !password ||
    password.trim() == ''
  ) {
    return res.status(200).send({
      success: false,
      message: 'All fields are required',
      timestamp: new Date(),
      code: 'ERR_FIELDS_REQUIRED',
    });
  }

  const user = await User.findOne({ email });
  if (!user)
    return res.send({
      success: false,
      message: 'User with this email does not exist',
    });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return res.send({
      success: false,
      message: 'Invalid password',
    });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  const finalUserToSend = await User.findOne({ email })
    .lean()
    .select('-password');

  res
    .cookie('token', token, config.COOKIE_CONFIG)
    .send({ success: true, user: finalUserToSend });
});

router.post('/register', async (req, res) => {
  const { name, email, password, country } = req.body;

  console.log(req.body);

  if (
    name == undefined ||
    !name ||
    name.trim() == '' ||
    email == undefined ||
    !email ||
    email.trim() == '' ||
    password == undefined ||
    !password ||
    password.trim() == '' ||
    country == undefined ||
    !country ||
    country.trim() == ''
  ) {
    return res.status(200).send({
      success: false,
      message: 'All fields are required',
      timestamp: new Date(),
      code: 'ERR_FIELDS_REQUIRED',
    });
  }

  if (!validateEmail(email)) {
    return res.status(200).send({
      success: false,
      message: `Are you sure that's a valid email?`,
      timestamp: new Date(),
      code: 'ERR_INVALID_EMAIL',
    });
  }

  const doesUserExist = await User.findOne({ email });
  if (doesUserExist) {
    return res.status(200).send({
      success: false,
      message: 'An account with this email already exists.',
      timestamp: new Date(),
      code: 'ERR_USER_EXISTS',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 15);

  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
    initials: getInitials(name),
    country: country,
    points: 0,
  });

  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, config.JWT_SECRET);

  return res.cookie('token', token, config.COOKIE_CONFIG).send({
    success: true,
    message: 'You have been registered successfully',
    data: newUser,
    timestamp: new Date(),
    code: 'USER_CREATED',
  });
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(200).send({
      success: false,
      message: 'User not found',
      timestamp: new Date(),
      code: 'ERR_USER_NOT_FOUND',
    });
  }

  return res.status(200).send({
    success: true,
    message: 'User found',
    data: user,
    timestamp: new Date(),
    code: 'USER_FOUND',
  });
});

router.post('/logout', auth, async (req, res) => {
  res.clearCookie('token').send({
    success: true,
    message: 'You have been logged out successfully',
    timestamp: new Date(),
    code: 'USER_LOGGED_OUT',
  });
});

export default router;
