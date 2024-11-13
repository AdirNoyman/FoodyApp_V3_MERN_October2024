import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUser = {
  auth0Id: string;
  email: string;
};

// GET user hook
export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserRequest = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user 😫');
    }
    // return the user json as JS object
    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery('fetchCurrentUser', getUserRequest);

  if (error) {

    toast.error(error.toString())
  }

  return {currentUser, isLoading}
};

// CREATE USER hook
export const useCreateUser = () => {
  console.log('Going in to createUser 🙋‍♂️');

  const { getAccessTokenSilently } = useAuth0();
  const createNewUserRequest = async (user: CreateUser) => {
    // Get the access token provided by Auth0 for this user (After he logged in)
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to create user 😫');
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createNewUserRequest);

  return { createUser, isLoading, isError, isSuccess };
};

type UpdateUserProfileRequest = {
  name: string;
  addressLine: string;
  city: string;
  country: string;
};

// UPDATE USER hook
export const useUpdateUserProfile = () => {
  const { getAccessTokenSilently } = useAuth0();

  // update fetch request
  const updateUserProfileRequest = async (
    formaData: UpdateUserProfileRequest
  ) => {
    // Anytime a request to update the user is made, a request to get the token from Auth0 will be sent
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formaData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user profile 😫');
    }

    return response.json();
  };

  // Make a call React query
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateUserProfileRequest);

  if (isSuccess) {
    toast.success('User profile updated 🤘🤓');
  }

  if (error) {
    toast.error(error.toString());
    // Clear the error state
    reset();
  }

  return { updateUser, isLoading };
};
