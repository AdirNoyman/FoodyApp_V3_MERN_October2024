import express from 'express';
import UserControllers from '../controllers/UserControllers';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateUserRequest } from '../middleware/validation';

const { createUser, updateUser, getCurrentUser } = UserControllers;

const router = express.Router();
router.get('/', jwtCheck, jwtParse, getCurrentUser);
router.post('/', jwtCheck, createUser);
router.put('/', jwtCheck, jwtParse, validateUserRequest, updateUser);

export default router;
