import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import styles from './Dashboard.scss';
import { AuthContext } from '../contexts/AuthContext';
import { signOut } from '../utils/api';

const displayElementList = [
  '_id',
  'email',
  'username',
  'firstName',
  'lastName',
];

const nameMap = new Map([
  ['_id', 'User ID'],
  ['email', 'Email'],
  ['username', 'Username'],
  ['firstName', 'First Name'],
  ['lastName', 'Last Name'],
]);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: null,
      errorMessage: null,
    };
    this.signOut = this._signOut.bind(this);
  }

  async _signOut() {
    const statusCode = await signOut();
    if (statusCode === 1) {
      const { history } = this.props;
      history.push(`/signin`);
    } else {
      this.setState({
        errorMessage: 'sign out error from auth server. Please contact the developer for the problem'
      });
    }
  }

  _renderProfileSection() {
    const { userProfile } = this.context;
    if (userProfile) {
      const formGroup = displayElementList.map((key, index) => {
        return (
          <dl className={styles.formGroup}>
            <dt>
              <div>{nameMap.get(key)}</div>
            </dt>
            <div className={styles.infoBox}>{userProfile[key]}</div>
          </dl>
        );
      });
      return (
        <div>
          {formGroup}
        </div>
      );
    }
    return null;
  }

  render() {
    const userProfile = this.context;
    const { errorMessage } = this.state;
    return (
      <div
        className={styles.container}
      >
        <div className={styles.header}>
          <div className={styles.title}>Your Profile</div>
          <div
            className={styles.logFunc}
            onClick={this.signOut}
          >
            Log out
          </div>
        </div>
        {this._renderProfileSection()}
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      </div>
    );
  }
}

Dashboard.contextType = AuthContext;

export default withStyles(styles)(Dashboard);
