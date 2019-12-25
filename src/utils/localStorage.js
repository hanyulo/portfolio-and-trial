const USER_PROFILE = 'userProfile';
const AUTHORIZED = 'authorized';

const keys = [
  USER_PROFILE,
  AUTHORIZED
];

const response = ({ ok, status, data }) => {
  return Object.freeze({
    ok,
    status,
    data,
  });
};


// TODO: window check - decoration
function AuthContextManager() {
  const fetchAuthContext = () => {
    const userProfile = localStorage.getItem(USER_PROFILE);
    const authorized = localStorage.getItem(AUTHORIZED);
    if (window && userProfile && authorized) {
      return response({
        ok: true,
        status: 1,
        data: {
          userProfile: JSON.parse(userProfile),
          authorized,
        },
      });
    }
    return response({
      ok: false,
      status: 0,
      data: null,
    });
  };


  const setAuthContext = ({ userProfile, authorized }) => {
    if (!userProfile || !authorized) {
      return response({
        ok: false,
        status: 0,
        data: null,
      });
    }
    localStorage.setItem(USER_PROFILE, JSON.stringify(userProfile));
    localStorage.setItem(AUTHORIZED, authorized);
    return response({
      ok: true,
      status: 1,
      data: null,
    });
  };


  const clearAtuhContext = () => {
    localStorage.removeItem(USER_PROFILE);
    localStorage.removeItem(AUTHORIZED);
    return response({
      ok: true,
      status: 1,
      data: null,
    });
  };

  return {
    fetchAuthContext,
    setAuthContext,
    clearAtuhContext,
  };
}

export {
  AuthContextManager,
};
