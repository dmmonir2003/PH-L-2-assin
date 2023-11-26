import express from 'express';
import { userContolar } from './user.contolar';

const router = express.Router();

//all application route

router.post('/users', userContolar.createUser);
router.get('/users', userContolar.getAllUser);
router.get('/users/:userId', userContolar.singelUser);
router.patch('/users/:userId', userContolar.updateUser);
router.delete('/users/:userId', userContolar.deleteUser);
router.put('/users/:userId/orders', userContolar.createOrder);
router.get('/users/:userId/orders', userContolar.getAllOrders);
router.get('/users/:userId/orders/total-price', userContolar.ordersPriceSum);

export const userRoute = router;
