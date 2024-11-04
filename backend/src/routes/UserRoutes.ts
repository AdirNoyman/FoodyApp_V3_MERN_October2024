import express from 'express';
import UserControllers from '../controllers/UserControllers';
import { jwtCheck, jwtParse } from '../middleware/auth';

const { createUser, updateUser } = UserControllers;

const router = express.Router();
router.post('/', jwtCheck, createUser);
router.put('/', jwtCheck, jwtParse, updateUser);

export default router;
