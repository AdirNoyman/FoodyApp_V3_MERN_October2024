import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // The user's Id in Auth0 Database
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  addressLine: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
