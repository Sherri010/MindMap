import { Component } from 'react';
import PropTypes from 'prop-types';
import * as styles from './MainHeader.styl';

console.log('Styles', styles)

export default class MainHeader extends Component {
  render(){
    return (
      <p className={styles.root}>Header</p>
    )
  }
}
