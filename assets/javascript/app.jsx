import React from 'react';
import ReactDOM  from 'react-dom';
import HomePage from './mainPages/HomePage/index.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={HomePage}/>
    </div>
  </Router>
), document.getElementById('app'));


{/* <div>
  <h3>MindMap</h3>
  <button id='createNoteBook'>
    create New NoteBook
  </button>
  <div id='list'></div>
  <div>
    <a href='/login'> Login </a>
  </div>
  <div>
    <a href='/logout'> Logout </a>
  </div>
</div> */}
