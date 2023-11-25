import { Request, Response } from 'express';
import { servicesDb } from './user.service';
import { userSchemaZodValidation } from './user.zod.validation.schema';

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await servicesDb.getAlluserInDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: ' Users fetched not !',
      error: err.message,
    });
  }
};
const singelUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const result = await servicesDb.singaleUserInDB(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: ' User  not fetched successfully! !',
      error: err.message,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userId = req.params.userId;

    const result = await servicesDb.updateUserInDB(parseInt(userId), userData);

    res.status(200).json({
      success: true,
      message: 'User update successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: ' User update not successfull !',
      error: err.message,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    await servicesDb.deleteUserInDB(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: ' User delete not successfull',
      error: err.message,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const zodValidationData = userSchemaZodValidation.parse(user);

    const result = await servicesDb.cteateUserInDB(zodValidationData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'User not created !',
      error: err.message,
    });
  }
};

export const userContolar = {
  createUser,
  getAllUser,
  singelUser,
  updateUser,
  deleteUser,
};
