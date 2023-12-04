/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import { Order, TUser } from './user.interface';
import { userModel } from './user.schema';
import bcrypt from 'bcrypt';

const cteateUserInDB = async function (user: TUser) {
  try {
    const userId = user.userId;

    const userExits = await userModel.isUserExits(userId);

    if (userExits) {
      throw new Error('User already exists');
    }

    const result = await userModel.create(user);
    return result;
  } catch (err: any) {
    throw new Error(`Failed to create user: ${err.message}`);
  }
};

const getAlluserInDB = async () => {
  const result = await userModel.find();
  return result;
};

const singaleUserInDB = async function (userId: number) {
  try {
    const userExits = await userModel.isUserExits(userId);

    if (!userExits) {
      throw new Error('User not found!');
    }

    const result = await userModel.findOne({ userId });
    return result;
  } catch (err: any) {
    throw new Error(`Failed to fetched user: ${err.message}`);
  }
};

const updateUserInDB = async function (userId: number, userData: TUser) {
  try {
    const userExits = await userModel.isUserExits(userId);

    if (!userExits) {
      throw new Error('User not found!');
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(
        userData.password,
        Number(config.bcrypt_salt),
      );
    }

    const result = await userModel.findOneAndUpdate({ userId }, userData, {
      new: true,
      runValidators: true,
    });
    return result;
  } catch (err: any) {
    throw new Error(`Failed to update user: ${err.message}`);
  }
};

const deleteUserInDB = async function (userId: number) {
  try {
    const userExits = await userModel.isUserExits(userId);

    if (!userExits) {
      throw new Error('User not found!');
    }
    const result = await userModel.findOneAndDelete({ userId });
    return result;
  } catch (err: any) {
    throw new Error(`Failed to delete user: ${err.message}`);
  }
};

const createOrderInDB = async function (userId: number, orderData: Order) {
  try {
    const userExists = await userModel.isUserExits(userId);
    if (!userExists) {
      throw new Error('User not found!');
    }

    await userModel
      .findOneAndUpdate(
        { userId: userId },
        { $push: { orders: orderData } },
        { new: true },
      )
      .exec();
  } catch (err: any) {
    throw new Error(`Failed to create order: ${err.message}`);
  }
};

const ordersPriceInDB = async function (userId: number) {
  try {
    const userExists = await userModel.isUserExits(userId);
    if (!userExists) {
      throw new Error('User not found!');
    }

    const getPrices = await userModel
      .aggregate([
        { $match: { userId: userId } },
        { $unwind: '$orders' },
        {
          $group: {
            _id: '$userId',
            totalPrices: { $sum: '$orders.price' },
          },
        },
        { $project: { totalPrices: 1 } },
      ])
      .exec();

    return getPrices;
  } catch (err: any) {
    throw new Error(`Failed to get total price: ${err.message}`);
  }
};

const getALlOrderInDB = async function (userId: number) {
  try {
    const userExists = await userModel.isUserExits(userId);
    if (!userExists) {
      throw new Error('User not found!');
    }

    const getOrders = await userModel
      .aggregate([{ $match: { userId: userId } }, { $project: { orders: 1 } }])
      .exec();
    return getOrders;
  } catch (err: any) {
    throw new Error(`Failed to get all Order: ${err.message}`);
  }
};

export const servicesDb = {
  cteateUserInDB,
  getAlluserInDB,
  singaleUserInDB,
  updateUserInDB,
  deleteUserInDB,
  createOrderInDB,
  getALlOrderInDB,
  ordersPriceInDB,
};
