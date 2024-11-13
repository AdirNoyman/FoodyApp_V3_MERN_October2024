import { useGetUser, useUpdateUserProfile } from '@/api/UserApi';
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm';
import { spawn } from 'child_process';

const UserProfilePage = () => {
  const {currentUser, isLoading: isGetLoading} = useGetUser()
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUserProfile();

  if (isGetLoading) {

    return <span>Loading...</span>
  }

  return <UserProfileForm onSave={updateUser} isLoading={isUpdateLoading} />;
};

export default UserProfilePage;
