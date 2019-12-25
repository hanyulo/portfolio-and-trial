import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { AuthContext, defaultAuth } from '../contexts/AuthContext';
import { fetchUserProfile } from '../utils/api';
import { AuthContextManager } from '../utils/localStorage';

const { fetchAuthContext } = AuthContextManager();

const _ = {
  isEmpty: _isEmpty,
  get: _get,
};

class AppShell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: null,
      authorized: false,
    }
    this.getContext = this._getContext.bind(this);
    this.setUserProfile = this._setUserProfile.bind(this);
    this.getAppShellState = this._getAppShellState.bind(this);
  }

  componentDidMount() {
    this._fetchUserProfile();
  }

  _setUserProfile(userProfile) {
    this.setState({
      userProfile,
      authorized: true,
    });
  }

  // TODO: this should be deleted after implement auth check in SSR
  _tmpRedirectCheck() {
    console.log('tmp redirect')
    const { history, location } = this.props;
    if (location.pathname === '/dashboard') {
      history.push('/signin');
    }
  }

  _replaceURL() {
    const { history } = this.props;
    if (location.pathname === '/dashboard') {
      history.replace('/dashboard');
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { authorized } = this.state;
    const { location } = this.props;
    if (!authorized && location.pathname === '/dashboard' && location.search === '') {
      this._tmpRedirectCheck();
    }
  }


  async _fetchUserProfile() {
    const { ok, data } = fetchAuthContext();
    if (window && ok) {
      return this.setState({
        userProfile: data.userProfile,
        authorized: data.authorized,
      });
    }

    const { location } = this.props;
    const search = _.get(location, 'search');
    const params = new URLSearchParams(search);
    const accessTokenFromUrl = params.get('accessToken');
    const userProfileFromAPI = await fetchUserProfile(accessTokenFromUrl);
    if (userProfileFromAPI) {
      return this.setState({
        userProfile: userProfileFromAPI,
        authorized: true,
      }, () => {
        this._replaceURL();
      });
    }
    console.log('accessToken')
    this._tmpRedirectCheck();
  }

  _getContext() {
    const { userProfile, authorized } = this.state;
    if (userProfile && !_.isEmpty(userProfile)) {
      return {
        userProfile,
        authorized,
        setUserProfile: this.setUserProfile,
      };
    }
    return {
      ...defaultAuth,
      setUserProfile: this.setUserProfile,
    };
  }

  _getAppShellState() {
    return this.state;
  }

  render() {
    const { children } = this.props;
    return (
      <AuthContext.Provider value={this.getContext()}>
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AppShell;
