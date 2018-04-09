import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import * as styles from './DashboardNavBar.styl';


export default class DashboardNavBar extends Component{
    // static propTypes = {
    //     user: PropTypes.object,
    //     onCreateNoteBook: PropTypes.func,
    // }
    //
    // static defaultProps = {
    //     user: {},
    // }

    render(){
        const { user: { image } } = this.props;
        return(
                <div className={styles.navBarWrapper}>
                    <div className={styles.titleWrapper}>
                        <h3 className={styles.title}>Mind Map</h3>
                    </div>
                    <div className={styles.addButtonWrapper}>
                        <button className={styles.addButton}>+ Notebook</button>
                    </div>
                    <div className={styles.userInfo}>
                        <img className={styles.userImage} src={image}/>
                    </div>
                </div>
        );
    }
}
