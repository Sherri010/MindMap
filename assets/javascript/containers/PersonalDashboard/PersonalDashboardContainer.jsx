import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PersonalDashboard from '../../mainPages/PersonalDashboard';
import {
    fetchUser,
    fetchUserNoteBooks,
} from '../../actions';

class PersonalDashboardContainer extends Component {
    componentDidMount(){
        this.handleFetchUser();
    }

    componentWillReceiveProps(nextProps){
        const { user: { id } } = nextProps;

        if(id && id !== this.props.user.id){
            this.handleFetchUserNoteBooks(nextProps);
        }
    }

	handleFetchUser(){
		const { fetchUser } = this.props;
        fetchUser();
	}

    handleFetchUserNoteBooks = (props) => {
        const { user: { id }, fetchUserNoteBooks } = props;
        fetchUserNoteBooks({
            UserId: id,
        });
    }

    render(){
        const { user, notebooks } = this.props;

        return (
            <PersonalDashboard
				user={user}
				notebooks={notebooks}
			/>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { user, PersonalDashboard: { notebooks: { notebooks } } } = state;
    return {
        user,
		notebooks,
    };
}

export default connect(mapStateToProps, {
    fetchUser,
    fetchUserNoteBooks,
})(PersonalDashboardContainer);
