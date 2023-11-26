import { Request, Response } from 'express';
import { servicesDb } from './user.service';
import {
  productSchemaValidationZod,
  userSchemaZodValidation,
} from './user.zod.validation.schema';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.status(400).json({
      success: false,
      message: ' User  not fetched !',
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
      message: ' User not update !',
      error: err.message,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    await servicesDb.deleteUserInDB(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: ' User  not deleted ',
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

const getAllOrders = async function (req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);

    const result = await servicesDb.getALlOrderInDB(userId);
    res.status(200).json({
      success: true,
      message: ' Order fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Order not fetched !',
      error: err.message,
    });
  }
};

const ordersPriceSum = async function (req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);

    const result = await servicesDb.ordersPriceInDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Total price not calculated !',
      error: err.message,
    });
  }
};

const createOrder = async function (req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);
    const orderProduct = req.body;

    const productVarify = productSchemaValidationZod.parse(orderProduct);

    const result = await servicesDb.createOrderInDB(userId, productVarify);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Order not created !',
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
  createOrder,
  getAllOrders,
  ordersPriceSum,
};
