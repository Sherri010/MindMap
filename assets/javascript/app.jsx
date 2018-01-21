import React from 'react';
import ReactDOM  from 'react-dom';
import HomePage from './mainPages/HomePage/index.jsx';
import PersonalDashboard from './mainPages/PersonalDashboard/index.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={HomePage}/>
      <Route path="/personalLibrary" component={PersonalDashboard}/>
    </div>
  </Router>
), document.getElementById('app'));
