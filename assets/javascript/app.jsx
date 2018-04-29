require("babel-polyfill");

import React from 'react';
import ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './mainPages/HomePage/index.jsx';
import PersonalDashboardContainer from './containers/PersonalDashboard/PersonalDashboardContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={HomePage}/>
                <Route path="/personalLibrary" component={PersonalDashboardContainer}/>
            </div>
        </Router>
    </Provider>
), document.getElementById('app'));
