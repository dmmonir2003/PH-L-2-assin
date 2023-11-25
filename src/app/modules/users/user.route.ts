import express from 'express';
import { userContolar } from './user.contolar';

const router = express.Router();

//all application route
router.post('/users', userContolar.createUser);
router.get('/users', userContolar.getAllUser);
router.get('/users/:userId', userContolar.singelUser);
router.patch('/users/:userId', userContolar.updateUser);
router.delete('/users/:userId', userContolar.deleteUser);

export const userRoute = router;
