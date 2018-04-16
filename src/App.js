import React, { Component } from 'react'
import { API_ROOT, HEADERS } from './constants'
// import {
//   BrowserRouter as Router,
//   Route
// } from 'react-router-dom'

import ProjectsList from './components/ProjectsList'
import Project from './components/Project'

class App extends Component {
  constructor() {
    super()
    this.state = {
      projects: [],
      currentProject: null
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
    })) //, () => console.log(`json[0].updated_at in getProjects: ${json[0].created_at}`)))
  }

  showProject = (id, parent) => {
    // console.log( `project clicked: ${JSON.stringify( this.state.projects.find(project => project.id === id) )}` )
    this.getProjects()
    this.setState({
      currentProject: this.state.projects.find(project => project.id === id),
    }) //, () => console.log(`currentProject in setState callback: ${JSON.stringify(this.state.currentProject)}`))
  }

  updateProject = (currentContents, project_id) => {
    // console.log(currentContents)
    fetch(`${API_ROOT}/projects/${project_id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify( {body: currentContents} )
    })
    .then(res => res.json())
    .then(json => console.log(`updateProject response: ${json.body}`))

  }

  render() {
    return (
        <div>
          {/*wrapped in sidebar css*/}
            <ProjectsList projects={this.state.projects} showProject={this.showProject} />
          {/*wrapped in sidebar css*/}

          {/*wrapped in main view css*/}
            {/*Intro, Project, Search*/}
            <Project project={this.state.currentProject || {} } updateProject={this.updateProject} />
          {/*wrapped in sidebar css*/}
        </div>
    );
  }
}

export default App;
