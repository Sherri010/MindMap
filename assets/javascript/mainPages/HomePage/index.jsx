import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import * as styles from './HomePage.styl';

export default class HomePage extends Component {
  render(){
    return (
      <div className={styles.homePageWrapper}>
          <h3>Mind Mapper</h3>
      </div>
    );
  }
}
