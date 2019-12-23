import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { AuthContext, defaultAuth } from '../contexts/AuthContext';
import { fetchUserProfile } from '../utils/api';

const _ = {
  isEmpty: _isEmpty,
  get: _get,
};

class AppShell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: null,
    }
    this.getContext = this._getContext.bind(this);
  }

  componentDidMount() {
    this._fetchUserProfile();
  }

  _setUpServerCookie() {

  }

  async _fetchUserProfile() {
    const { location } = this.props;
    const search = _.get(location, 'search');
    const params = new URLSearchParams(search);
    const accessToken = params.get('accessToken');
    if (accessToken) {
      const response = await fetchUserProfile(accessToken);
      this.setState({
        userProfile: _.get(response, 'data.response.data', null)
      });
    }
    return null;
  }

  _getContext() {
    const { userProfile } = this.state;
    if (userProfile && !_.isEmpty(userProfile)) {
      return {
        userProfile,
        authorized: true,
      };
    }
    return defaultAuth;
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
