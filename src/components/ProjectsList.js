import React from 'react'
import { API_ROOT, HEADERS } from '../constants'

class ProjectList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects() {
    fetch(`${API_ROOT}/projects`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(json => console.log(json))
  }


  render() {
    return (
    
      <div></div>

    )
  }
}

export default ProjectList