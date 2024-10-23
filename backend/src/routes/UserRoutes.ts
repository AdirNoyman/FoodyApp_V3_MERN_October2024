import express from 'express';
import UserControllers from '../controllers/UserControllers';

const router = express.Router();

const { createUser } = UserControllers;

router.post('/', createUser);

export default router;
