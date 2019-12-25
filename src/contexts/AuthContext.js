import React from 'react';

export const defaultAuth = {
  authorized: false,
  userProfile: null,
  setUserProfile: () => {},
};

export const AuthContext = React.createContext(defaultAuth);
