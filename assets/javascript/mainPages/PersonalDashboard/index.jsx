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
        // $.ajax({
        //    type: 'GET',
        //    url: 'http://localhost:4567/user',
        //    error: function() {
        //       console.log('error on ajax')
        //    },
        //    success: function(data) {
        //        console.log(data);
        //        user = data;
        //    }
        // });

        getUser(function getUserCallback(res){
            user = console.log(res)
        });
    }

    render(){
        const { user } = this.state;
        console.log('redern', user)
        // const { lastName } = user;
        return (
            <div>
                <h3>Personal Dashboard</h3>
            </div>
        );
    }
}
