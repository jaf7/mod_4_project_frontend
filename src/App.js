import React, { Component } from 'react'
import { API_ROOT, HEADERS } from './constants'
// import {
//   BrowserRouter as Router,
//   Route
// } from 'react-router-dom'

import ProjectsList from './components/ProjectsList'

class App extends Component {
  constructor() {
    super()
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects = () => {
    fetch(`${API_ROOT}/projects`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(json => this.setState({
      projects: json
    }))
  }

  showProject = (id, parent) => {
    console.log( `project clicked: ${JSON.stringify( this.state.projects.find(project => project.id === id) )}` )
    // this.setState ?
  }

  render() {
    return (
        <div>
          {/*wrapped in sidebar css*/}
            <ProjectsList projects={this.state.projects} showProject={this.showProject} />
          {/*wrapped in sidebar css*/}

          {/*wrapped in main view css*/}
            {/*Intro, Project, Search*/}
          {/*wrapped in sidebar css*/}
        </div>
    );
  }
}

export default App;
