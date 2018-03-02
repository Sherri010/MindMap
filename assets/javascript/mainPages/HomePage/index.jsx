import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as styles from './HomePage.styl';

export default class HomePage extends Component {
  render(){
    return (
      <div className={styles.homePageWrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>Mind Mapper</h2>
          <div className={styles.loginWrapper}>
              <a className={styles.button} href='/login'>Login</a>
          </div>
        </div>
          <div className={styles.banner}>
              <div className={styles.coverImage}></div>
          </div>
      </div>
    );
  }
}
