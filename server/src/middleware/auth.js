import jwt from 'jsonwebtoken';
import config from '../../config.js';

async function auth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).send({
      success: false,
      message: `You're not logged in.`,
      timestamp: new Date(),
      code: 'ERR_NO_TOKEN',
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(200).send({
      success: false,
      message: 'Invalid token',
      timestamp: new Date(),
      code: 'ERR_INVALID_TOKEN',
    });
  }
}

export default auth;
