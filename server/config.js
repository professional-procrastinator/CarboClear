import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI,
  allowedOrigins:
    process.env.NODE_ENV == 'production'
      ? ['https://carboclear.vercel.app']
      : ['http://localhost:3000', 'https://carboclear.vercel.app'],
  COOKIE_CONFIG:
    process.env.NODE_ENV == 'production'
      ? {
          httpOnly: true,
          maxAge: 15552000000,
          secure: true,
          sameSite: 'none',
        }
      : { httpOnly: true, maxAge: 15552000000 },
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
