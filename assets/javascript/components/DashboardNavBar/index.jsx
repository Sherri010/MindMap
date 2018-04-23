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
        onCreateNoteBook: PropTypes.func,
    }

    static defaultProps = {
        user: {},
    }

    handlePostNotebook = () => {
        const { postUserNoteBook } = this.props;

        postUserNoteBook({
            name: 'New NoteBook from socket',
        });
    }

    render(){
        const { user: { image } } = this.props;
        return(
                <div className={styles.navBarWrapper}>
                    <div className={styles.titleWrapper}>
                        <h3 className={styles.title}>Mind Map</h3>
                    </div>
                    <div className={styles.addButtonWrapper}>
                        <button
                            className={styles.addButton}
                            onClick={this.handlePostNotebook}
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
