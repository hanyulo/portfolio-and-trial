import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './SignUp.scss';
import { signUp } from '../utils/api';

const displayElementList = [
  'username',
  'email',
  'password',
  'firstName',
  'lastName',
];

const nameMap = new Map([
  ['email', 'Email Address'],
  ['username', 'Username'],
  ['password', 'Password'],
  ['firstName', 'First Name'],
  ['lastName', 'Last Name'],
]);

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      signUpInfo: null,
    };
    this.onSubmit = this._onSubmit.bind(this);
    this.formGroup = {};
  }


  _onChangeInput(key, value) {
    this.formGroup[key] = value;
  }

  async _onSubmit() {
    const { ok, errorMessage, message } = await signUp(this.formGroup);
    if (ok) {
      this.setState({
        errorMessage: null,
        signUpInfo: message,
      });
    } else {
      this.setState({
        errorMessage,
        signUpInfo: null,
      });
    }
  }

  _renderForm() {
    const content = displayElementList.map((key) => {
      const type = key === 'password' ? 'password' : 'text';
      return (
        <dl>
          <dt>
            <label>{nameMap.get(key)}</label>
          </dt>
          <input type={type} onChange={(e) => { this._onChangeInput(key, e.target.value) }} />
        </dl>
      );
    });
    return (
      <div className={styles.formGroup}>
        {content}
        <input
          className={styles.formControl}
          type="submit"
          value="Submit"
          onClick={this.onSubmit}
          tabIndex={0}
          onKeyDown={() => {}}
        />
      </div>
    );
  }

  render() {
    const { errorMessage, signUpInfo } = this.state;
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>
          Create Your Account
        </h1>
        {this._renderForm()}
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        {signUpInfo && <div className={styles.info}>{signUpInfo}</div>}
      </div>
    );
  }
}


export default withStyles(styles)(SignUp);
