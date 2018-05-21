import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as styles from './HomePage.styl';

export default class HomePage extends Component {
  render(){
    return (
      <div className={styles.homePageWrapper}>
        <div className={styles.header}>
          <img src={'../../images/MindMaplogo.png'}/>
          <div className={styles.loginWrapper}>
              <Link className={styles.button} to={'/login'}>Login</Link>
          </div>
        </div>
          <div className={styles.banner}>
              <div className={styles.coverImage}></div>
          </div>
      </div>
    );
  }
}
