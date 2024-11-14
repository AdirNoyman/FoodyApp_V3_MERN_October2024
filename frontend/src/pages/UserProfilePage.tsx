import { useGetUser, useUpdateUserProfile } from '@/api/UserApi';
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm';

const UserProfilePage = () => {
  // The  useGetUser() function will run as soon as the UserProfilePage loads and will store it in the currentUser variable
  const {currentUser, isLoading: isGetLoading} = useGetUser()
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUserProfile();

  if (isGetLoading) {
    // Loading current user data
    return <span>Loading...</span>
  }

  return <UserProfileForm onSave={updateUser} isLoading={isUpdateLoading} />;
};

export default UserProfilePage;
