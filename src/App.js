import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import ProjectsList from './components/ProjectsList'

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
