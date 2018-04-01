import React,{ Component } from 'react';
import PropTypes from 'prop-types';
// import { getUser } from '../../sockets/users';
import { fetchUser } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


let user;


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
            // fetchUserNoteBooks({
            //     UserId: id,
            // });
            console.log('get user notebooks', id)
        }
    }

    render(){
        const { user: { firstName, lastName } } = this.props;

        return (
            <div>
                <h3>Personal Dashboard</h3>
                <p>{firstName} {lastName}</p>
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
})(PersonalDashboard);
