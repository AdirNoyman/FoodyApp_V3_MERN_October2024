import { useUpdateUserProfile } from '@/api/UserApi';
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm';

const UserProfilePage = () => {
  const { updateUser, isLoading } = useUpdateUserProfile();

  return <UserProfileForm onSave={updateUser} isLoading={isLoading} />;
};

export default UserProfilePage;
