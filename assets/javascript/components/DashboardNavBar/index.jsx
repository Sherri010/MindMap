import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as styles from './DashboardNavBar.styl';
import {
    postUserNoteBook,
} from '../../actions';

class DashboardNavBar extends Component{
    static propTypes = {
        user: PropTypes.object,
        onCreateNotebookClick: PropTypes.func,
    }

    static defaultProps = {
        user: {},
    }

    render(){
        const { user: { image }, onCreateNotebookClick } = this.props;
        return(
                <div className={styles.navBarWrapper}>
                    <div className={styles.titleWrapper}>
                        <h3 className={styles.title}>Mind Map</h3>
                    </div>
                    <div className={styles.addButtonWrapper}>
                        <button
                            className={styles.addButton}
                            onClick={onCreateNotebookClick}
                        >+ Notebook</button>
                    </div>
                    <div className={styles.userInfo}>
                        <img className={styles.userImage} src={image}/>
                    </div>
                </div>
        );
    }
}

export default connect(null, {
    postUserNoteBook,
})(DashboardNavBar);
