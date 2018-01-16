import App from './app.jsx';
import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// import './home.js';
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'))
