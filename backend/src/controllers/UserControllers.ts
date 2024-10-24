import { Request, Response } from "express";
import User from "../models/user";

const createUser = async (req: Request, res: Response)  => {
  // Make sure the user doesn't already exist in my app DB
  try {
    const { auth0Id } = req.body;
    const isUserExist = await User.findOne({ auth0Id });

    // If user exists - do nothing
    if (isUserExist) {
      return res.status(200).send();
    }

    // Create the user
    const newUser = new User(req.body);

    await newUser.save();

    // Return the user object to the calling client
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Error creating user 😫' });
  }
};

export default {
  createUser
};


