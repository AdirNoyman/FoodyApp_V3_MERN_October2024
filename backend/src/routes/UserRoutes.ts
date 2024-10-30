import express from 'express';
import UserControllers from '../controllers/UserControllers';
import { jwtCheck } from '../middleware/auth';

const { createUser } = UserControllers;

const router = express.Router();
router.post('/', jwtCheck, createUser);

export default router;
