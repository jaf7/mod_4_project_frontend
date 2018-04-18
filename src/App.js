import React, { Component } from 'react'
import { API_ROOT, HEADERS } from './constants'
// import {
//   BrowserRouter as Router,
//   Route
// } from 'react-router-dom'
import { ActionCable } from 'react-actioncable-provider'
// import Cable from './Cable'
// import { Button, Icon } from 'semantic-ui-react'
// import { Segment } from 'semantic-ui-react'

import { Widget, addResponseMessage } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css'
import uuid from 'uuid/v1'

// import ProjectsList from './components/ProjectsList'
import ProjectListWrapper from './components/ProjectListWrapper'
import Project from './components/Project'
import NewProjectModal from './components/NewProjectModal'

const senderId = uuid()

class App extends Component {
  constructor() {
    super()
    this.state = {
      projects: [],
      currentProject: {},
      modalState: false
      // senderId: ''
    }
  }

  componentDidMount() {
    this.getProjects()
    addResponseMessage("I have no idea what I'm doing :P")
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
    this.getProjects()
    this.setState({
      currentProject: this.state.projects.find(project => project.id === id),
    })
  }

  updateProject = (currentContents, project_id) => {
    // console.log(currentContents)
    fetch(`${API_ROOT}/projects/${project_id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify( {body: currentContents} )
    })
  }

  createProject = (projectTitle) => {

    console.log(`proj name in create: ${projectTitle}`)
    fetch(`${API_ROOT}/projects`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify( {title: projectTitle} )
    })
  }

  handleReceivedProject = response => {
    const { project } = response
    project.id === this.state.currentProject.id ? this.setState({currentProject: project}) : this.getProjects()
  }

  handleReceivedMessage = response => {
    const { message } = response
    // console.log(`this.state.senderId in handleReceived: ${this.state.senderId}`) // out of date, doesn't match
    // console.log(typeof(this.state.senderId))
    // console.log(`sender id in response: ${message.sender_id}`)
    // console.log(typeof(message.sender_id))
    // message.sender_id !== this.state.senderId ? addResponseMessage(message.text) : null
    message.sender_id !== senderId ? addResponseMessage(message.text) : null
  }

  handleNewUserMessage = (newMessage) => {
    // console.log(`newMessage: ${newMessage}`)
    // this.setState({senderId: uuid()}, console.log(`this.state.senderId in handleNew: ${this.state.senderId}`))
    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify( {text: newMessage, sender_id: senderId} )
    })
  }

  handleModalClick = () => { this.setState({ modalState: !this.state.modalState }) }

  render() {
    return (
        <div>

          <ActionCable
            channel={{ channel: 'ProjectsChannel' }}
            onReceived={this.handleReceivedProject}
          />

          <ActionCable
            channel={{ channel: 'MessagesChannel'}}
            onReceived={this.handleReceivedMessage}
          />

          <div className="ui grid noMargin">

            <div className="three wide column">
                <ProjectListWrapper projects={this.state.projects} showProject={this.showProject} handleModalOpen={this.handleModalClick} />
            </div>

            <div className="nine wide column" style={{'paddingLeft':'0', 'paddingTop':'.6rem'}} >
              {/*Intro, Project, Search*/}
              <Project project={this.state.currentProject || {} } title={this.state.currentProject.title} updateProject={this.updateProject} />
            </div>

            <div className="four wide column">
              <Widget 
                handleNewUserMessage={this.handleNewUserMessage}
                title="Editr  Chat"
                subtitle=""
              />
            </div>

          </div>

          <NewProjectModal modalState={this.state.modalState} handleModalClose={this.handleModalClick} createProject={this.createProject} />

        </div>
    );
  }
}

export default App;
