import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  userName: { type: String },
  fullName: {
    firstName: { type: String },
    lastName: { type: String },
  },
  age: { type: Number },
  email: { type: String, unique: true },
  password: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },

  hobbies: [String],
  isActive: Boolean,
});

// pre hook

userSchema.pre('find', async function (next) {
  this.select('userName fullName age email address');
  next();
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt),
    );
  }
  next();
});

//post hook

userSchema.post('save', function (doc, next) {
  doc.password = undefined;
  next();
});

export const userModel = model<TUser>('users', userSchema);
