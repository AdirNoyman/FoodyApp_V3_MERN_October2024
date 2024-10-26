import { useMutation } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUser = {
  auth0Id: string;
  email: string;
};

// Create and export the create user hook
export const useCreateUser = () => {
  const createNewUserRequest = async (user: CreateUser) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
      method: 'POST',
      headers: {
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
