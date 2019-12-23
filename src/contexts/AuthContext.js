import React from 'react';

export const defaultAuth = {
  authorized: false,
  userProfile: null,
};

export const AuthContext = React.createContext(defaultAuth);
