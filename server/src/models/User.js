import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 255,
    },
    email: {
      type: String,
      minlength: 4,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    initials: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);

export default User;
