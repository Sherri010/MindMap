import React, { Component } from 'react';
import { render } from 'react-dom';
import MainHeader from './components/MainHeader/index.jsx';
export default class App extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}
