import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../sockets/users';

let user;


export default class PersonalDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
        }
    }

    componentDidMount(){
        const component = this;
        getUser(function getUserCallback(res){
            // user = console.log(res)
            user = res;
            component.setState({ user })
            console.log('CDM', user)
        });
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
