import { Request, Response } from 'express';
import User from '../models/user';


const createUser = async (req: Request, res: Response) => {
  // Make sure the user doesn't already exist in my app DB
  try {
    const { auth0Id } = req.body;
    const isUserExist = await User.findOne({ auth0Id });

    // If user exists - do nothing and return
    if (isUserExist) {
      return res.status(200).send();
    }

    // User does not exist -> Create the user
    const newUser = new User(req.body);

    await newUser.save();

    // Return the user object to the calling client
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Error creating user 😫' });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    // Get the data from the form the user submitted
    const { name, addressLine, country, city } = req.body;

    const user = await User.findById(req.userId);

    if (!user) res.status(404).json({ message: 'User not found 🤷‍♂️' });

    user!.name = name;
    user!.addressLine = addressLine;
    user!.city = city;
    user!.country = country;
    await user!.save();
    res.send(user);

  } catch (error) {
    console.log('Error trying to update user 😫');
    res.status(500).json({ message: 'Error updating user 😫' });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {

  try {

    const currentUser = await User.findOne({_id: req.userId })
    if (!currentUser) {
      return res.status(404).json({message: "User not found 🤷‍♂️"})
    }

    res.json(currentUser)
    
  } catch (error) {
    console.log("Error getting user info 😫")
    return res.status(500).json({message: "Oops...something went wrong 🤦‍♂️"})
  }

}

export default {
  createUser,
  updateUser,
  getCurrentUser
};
