import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// create schema
const userFullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});
const userAddressSchema = new Schema<TUserAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, ' User id must be unique'],
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: userFullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: userAddressSchema,
    required: true,
  },
});

// middlewares
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// static custom method
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

// create model
export const User = model<TUser, UserModel>('User', userSchema);
