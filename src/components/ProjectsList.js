import React from 'react'

class ProjectList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects() {
    fetch('API_ROOT', {
      method: 'GET'
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