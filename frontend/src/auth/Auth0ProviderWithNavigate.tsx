import { useCreateUser } from '@/api/UserApi';
import { AppState, Auth0Provider, User } from '@auth0/auth0-react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const { createUser } = useCreateUser();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUri) {
    throw new Error('Unable to initialize auth 🤷‍♂️😫');
  }

  // This redirect function will be called when the user is redirected back from Auth0 to our app. AppState will hold information like the current url the user is on before he was sent to Auth0. The User will hold information about the user
  const onRedirectCallback = (appState?: AppState, user?: User) => {
    
    console.log("On redirect call back was called 🤓")
    // user sub = the user Id
    if (user?.sub && user?.email) {

      createUser({auth0Id: user.sub, email: user.email})


    }

    
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
