import { TUser } from './user.interface';
import { userModel } from './user.schema';

const cteateUserInDB = async (user: TUser) => {
  const result = await userModel.create(user);
  return result;
};

const getAlluserInDB = async () => {
  const result = await userModel.find();
  return result;
};

const singaleUserInDB = async (userId: number): Promise<TUser | null> => {
  const result = await userModel.findOne({ userId });
  return result;
};

const updateUserInDB = async (
  userId: number,
  userData: TUser,
): Promise<TUser | null> => {
  const result = await userModel.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserInDB = async (userId: number): Promise<TUser | null> => {
  const result = await userModel.findOneAndDelete({ userId });
  return result;
};

export const servicesDb = {
  cteateUserInDB,
  getAlluserInDB,
  singaleUserInDB,
  updateUserInDB,
  deleteUserInDB,
};
