import { useCreateUser } from '@/api/UserApi';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallBackPage = () => {

  // We are using useRef and not useState because useRef won't cause the page to rerender
  const hasCreatedUserAlready = useRef(false);
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateUser();

  useEffect(() => {
    // user sub = the user Id
    if (user?.sub && user?.email && !hasCreatedUserAlready.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      // This will make sure the useEffect will run only once
      hasCreatedUserAlready.current = true;
    }
    navigate('/');
  }, [createUser, navigate, user]);

  // TODO: change text when deploying to production
  return <>Loading auth stage landing page 🙄....</>;
};

export default AuthCallBackPage;
