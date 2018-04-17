import React, { Component } from 'react'
import { API_ROOT, HEADERS } from './constants'
// import {
//   BrowserRouter as Router,
//   Route
// } from 'react-router-dom'
import { ActionCable } from 'react-actioncable-provider'
// import Cable from './Cable'
import { Button, Icon } from 'semantic-ui-react'
import { Segment } from 'semantic-ui-react'

// import ProjectsList from './components/ProjectsList'
import ProjectListWrapper from './components/ProjectListWrapper'
import Project from './components/Project'
import NewProjectModal from './components/NewProjectModal'

class App extends Component {
  constructor() {
    super()
    this.state = {
      projects: [],
      currentProject: {},
      modalState: false
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
    // .then(res => res.json())
    // .then(json => console.log(`updateProject response: ${json.body}`))
  }

  createProject = (projectTitle) => {

    console.log(`proj name in create: ${projectTitle}`)
    fetch(`${API_ROOT}/projects`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify( {title: projectTitle} )
    })
    // .then(res => res.json())
    // .then(json => () => console.log(`createProject res: ${json.title}`))
  }

  handleReceivedProject = response => {
    const { project } = response;
    console.log(`project.id in handle receive: ${project.id}`)
    project.id === this.state.currentProject.id ? this.setState({currentProject: project}) : this.getProjects()
  };

  handleModalClick = () => { this.setState({ modalState: !this.state.modalState }) }

  render() {
    return (
        <div>

          <ActionCable
            channel={{ channel: 'ProjectsChannel' }}
            onReceived={this.handleReceivedProject}
          /> 
          
          <div className="ui grid noMargin">
            <div className="three wide column">
              {/*wrapped in sidebar css*/}
                <ProjectListWrapper projects={this.state.projects} showProject={this.showProject} handleModalOpen={this.handleModalClick} />
                {/*<ProjectsList projects={this.state.projects} showProject={this.showProject} />*/}
              {/*wrapped in sidebar css*/}
            </div>
            <div className="nine wide column" style={{'padding-left':'0', 'padding-top':'.6rem'}} >
              {/*wrapped in main view css*/}
                {/*Intro, Project, Search*/}
                {/*<Segment raised style={{'padding':'5px', 'text-align':'center', 'margin-bottom':'0'}} ><h2>Title</h2></Segment>*/}
                <Project project={this.state.currentProject || {} } updateProject={this.updateProject} />
              {/*wrapped in sidebar css*/}
            </div>
            <div className="four wide column">
              <p>Chat goes here</p>
            </div>
          </div>

          <NewProjectModal modalState={this.state.modalState} handleModalClose={this.handleModalClick} createProject={this.createProject} />

        </div>
    );
  }
}

export default App;
