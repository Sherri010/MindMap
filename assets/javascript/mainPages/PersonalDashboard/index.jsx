import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../sockets/users';
import { fetchUser } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';




let user;


class PersonalDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
        }
    }

    componentDidMount(){
        const component = this;
        let { dispatch } = this.props;
        console.log('**', this.props)
        // getUser(function getUserCallback(res){
        //     // user = console.log(res)
        //     user = res;
        //     component.setState({ user })
        //     console.log('CDM', user)
        // });
        //
        // let action = fetchUser();
        // dispatch(action)
    }

    render(){
        const { user } = this.state;
        console.log('redern', user)
        const { lastName } = user;

        return (
            <div>
                <h3>Personal Dashboard {lastName}</h3>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    usetGet: id => {
      dispatch(toggleTodo(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDashboard);
