import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import DashboardNavBar from '../../components/DashboardNavBar';
import * as styles from './PersonalDashboard.styl';
import {
    fetchUser,
    fetchUserNoteBooks,
} from '../../actions';


class PersonalDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
        };
    }

    componentDidMount(){
        const component = this;
        const { fetchUser } = this.props;
        fetchUser();
    }

    componentWillReceiveProps(nextProps){
        const { user: { id } } = nextProps;

        if(id && id !== this.props.user.id){
            this.fetchUserNoteBooks(nextProps);
        }
    }

    fetchUserNoteBooks = (props) => {
        const { user: { id }, fetchUserNoteBooks } = props;
        fetchUserNoteBooks({
            UserId: id,
        });
    }

    renderNoteBooksList = () => {

    }

    render(){
        const { user } = this.props;

        return (
            <div>
                <DashboardNavBar
                    user={user}
                />
                <div className={styles.dashboardWrapper}>
                    <div className={styles.listWrapper}>
                        {this.renderNoteBooksList()}
                    </div>
                    <div className={styles.activeNnoteBookWrapper}>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { user } = state;
    return {
        user,
    };
}

export default connect(mapStateToProps, {
    fetchUser,
    fetchUserNoteBooks,
})(PersonalDashboard);
