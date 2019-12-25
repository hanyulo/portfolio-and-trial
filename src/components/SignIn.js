import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './SignIn.scss';
import { signIn, fetchUserProfile } from '../utils/api';
import { AuthContext } from '../contexts/AuthContext';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
    }
    this.email = null;
    this.password = null;
    // this.onChangeEmail = this._onChangeEmail.bind(this);
    // this.onChangePassword = this._onChangePassword.bind(this);
    this.onSubmit = this._onSubmit.bind(this);
  }

  _onChangeEmail(e) {
    const value = e.target.value;
    this.email = value;
  }

  _onChangePassword(e) {
    const value = e.target.value;
    this.password = value;
  }

  _valueValidation() {
    // TODO
  }

  async _onSubmit() {
    const response = await signIn(this.email, this.password);
    if (!response.ok) {
      const { errorMessage } = response;
      this.setState({
        errorMessage,
      })
    } else {
      const { setUserProfile } = this.context;
      const { location } = this.props;
      const data = await fetchUserProfile();
      if (data) {
        setUserProfile(data);
        const { history } = this.props;
        history.push(`/dashboard`);
      }
      console.log('sign in failed')
    }
  }

  render() {
    return (
      <div
        className={styles.container}
      >
        <div className={styles.header}>
          Sign In
        </div>
        <div className={styles.column}>
          <div className={styles.panel}>
            <label>Email</label>
            <input
              className={styles.formControl}
              type="text"
              onChange={(e) => {
                this._onChangeEmail(e);
              }}
            />
            <label>Password</label>
            <input
              className={styles.formControl}
              type="text"
              onChange={(e) => {
                this._onChangePassword(e);
              }}
            />
            <input
              className={styles.formControl}
              type="submit"
              value="Sign in"
              onClick={this.onSubmit}
              tabIndex={0}
              onKeyDown={() => {}}
            />
          </div>
          <div className={styles.panel} style={{ marginTop: '15px' }}>
            <span style={{ marginRight: '10px' }}>New to the place ?</span>
            <Link
              to="/signup"
            >
              Create an account
            </Link>
          </div>
          {this.state.errorMessage && <div className={styles.error}>{this.state.errorMessage}</div>}
        </div>
      </div>
    );
  }
}

SignIn.contextType = AuthContext;

export default withStyles(styles)(SignIn);
