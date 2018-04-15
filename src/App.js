import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <div>
          {/*wrapped in sidebar css*/}
            <ProjectsList />
          {/*wrapped in sidebar css*/}

          {/*wrapped in main view css*/}
            {/*Intro, Project, Search*/}
          {/*wrapped in sidebar css*/}
        </div>
    );
  }
}

export default App;
