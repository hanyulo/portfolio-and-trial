import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './ErrorPage.scss';

const statusTextMap = {
  404: 'Oh no! Page not found',
};

const ErrorPage = ({ webStatus }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgWrapeer}>
        <img src="/assets/profile_sketch.png" />
      </div>
      <div>{statusTextMap[webStatus]}</div>
    </div>
  );
};

export default withStyles(styles)(ErrorPage);
