import { Schema, model } from 'mongoose';
import { Order, TUser, userInstanceModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const orderSchema = new Schema<Order>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<TUser, userInstanceModel>({
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
  order?: [orderSchema],
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
  if (doc && doc.password) {
    doc.password = undefined;
  }
  next();
});

userSchema.post('findOne', function (doc, next) {
  if (doc && doc.password) {
    doc.password = undefined;
  }
  next();
});

userSchema.post('find', function (doc, next) {
  if (doc && doc.password) {
    doc.password = undefined;
  }
  next();
});

userSchema.post('findOneAndUpdate', function (doc, next) {
  if (doc && doc.password) {
    doc.password = undefined;
  }
  next();
});
userSchema.statics.isUserExits = async function (userId: number | null) {
  const existingUser = await userModel.findOne({ userId });
  return existingUser;
};

export const userModel = model<TUser, userInstanceModel>('users', userSchema);
