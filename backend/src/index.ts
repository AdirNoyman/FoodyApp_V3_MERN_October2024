import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import UserRoutes from './routes/UserRoutes';

const app = express();

// Connect to the Database

// MIDDLEWARE
app.use(express.json());
app.use(cors());

app.use('/api/v1/users', UserRoutes);

try {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
  console.log('Connected successfully to the database 😎🤘');
  app.listen(7001, () => {
    console.log('Server started on localhost:7000 🚀');
  });
} catch (error) {
  console.log('Error starting the app 😫 ', error);
}
