import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUser = {
  auth0Id: string;
  email: string;
};

// Create and export the create user hook
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
