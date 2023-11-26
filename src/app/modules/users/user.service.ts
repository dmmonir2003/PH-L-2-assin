import { TUser } from './user.interface';
import { userModel } from './user.schema';

const cteateUserInDB = async function (user: TUser) {
  try {
    const userId = user.userId;

    const userExits = await userModel.isUserExits(userId);

    if (userExits) {
      throw new Error('User already exists');
    }

    const result = await userModel.create(user);
    return result;
  } catch (err) {
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
      throw new Error('User not exists');
    }

    const result = await userModel.findOne({ userId });
    return result;
  } catch (err) {
    throw new Error(`Failed to create user: ${err.message}`);
  }
};

const updateUserInDB = async function (userId: number, userData: TUser) {
  try {
    const userExits = await userModel.isUserExits(userId);

    if (!userExits) {
      throw new Error('User not exists');
    }

    const result = await userModel.findOneAndUpdate({ userId }, userData, {
      new: true,
      runValidators: true,
    });
    return result;
  } catch (err) {
    throw new Error(`Failed to create user: ${err.message}`);
  }
};

const deleteUserInDB = async function (userId: number) {
  try {
    const userExits = await userModel.isUserExits(userId);

    if (!userExits) {
      throw new Error('User not exists');
    }
    const result = await userModel.findOneAndDelete({ userId });
    return result;
  } catch (err) {
    throw new Error(`Failed to create user: ${err.message}`);
  }
};

const createOrderInDB = async function (userId: number, orderData) {
  try {
    const userExists = await userModel.isUserExits(userId);
    if (!userExists) {
      throw new Error('User not exists');
    }

    const updatedUser = await userModel
      .findOneAndUpdate(
        { userId: userId },
        { $push: { order: orderData } },
        { new: true },
      )
      .exec();
  } catch (err) {
    throw new Error(`Failed to create user: ${err.message}`);
  }
};

const ordersPriceInDB = async function (userId: number) {
  try {
    const userExists = await userModel.isUserExits(userId);
    if (!userExists) {
      throw new Error('User not exists');
    }

    const getPrices = await userModel
      .aggregate([
        { $match: { userId: userId } },
        { $unwind: '$order' },
        {
          $group: {
            _id: '$userId',
            totalPrices: { $sum: '$order.price' },
          },
        },
        { $project: { totalPrices: 1 } },
      ])
      .exec();

    return getPrices;
  } catch (err) {
    throw new Error(`Failed to create user: ${err.message}`);
  }
};

const getALlOrderInDB = async function (userId: number) {
  try {
    const userExists = await userModel.isUserExits(userId);
    if (!userExists) {
      throw new Error('User not exists');
    }

    const getOrders = await userModel
      .aggregate([{ $match: { userId: userId } }, { $project: { order: 1 } }])
      .exec();
    return getOrders;
  } catch (err) {
    throw new Error(`Failed to create user: ${err.message}`);
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
