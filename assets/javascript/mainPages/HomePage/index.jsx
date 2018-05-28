import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import * as styles from './HomePage.styl';

export default class HomePage extends Component {
  render(){
    return (
      <div className={styles.homePageWrapper}>
        <div className={styles.header}>
          <img src={'../../images/MindMaplogo.png'}/>
          <div className={styles.loginWrapper}>
              <a className={styles.button} href={'/login'}>Login</a>
          </div>
        </div>
          <div className={styles.banner}>
              <div className={styles.coverImage}></div>
          </div>
      </div>
    );
  }
}
