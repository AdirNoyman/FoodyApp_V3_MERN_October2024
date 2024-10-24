import express from 'express';
import UserControllers from '../controllers/UserControllers';

const { createUser } = UserControllers;

const router = express.Router();
router.post('/', createUser);

export default router;
