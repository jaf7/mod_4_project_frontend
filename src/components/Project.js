import React from 'react'

import {Controlled as CodeMirror} from 'react-codemirror2'
import { Segment } from 'semantic-ui-react'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/ambiance.css';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/jsx/jsx');

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentContents: props.project.body
    }
    // <Project id: 1, created_at: "2018-04-15 13:55:49", updated_at: "2018-04-15 13:55:49", user_id: 1, title: "project one", body: "project one body">
    // if (props.project) {
    //   this.state = {
    //     // value: 'console.log("hello world")'
    //     body: props.project.body
    //   }
    // }
    // else {
    //   this.state = {}
    // }
  }
  
  componentWillReceiveProps(nextProps) {
    // console.log(`nextProps in Project: ${nextProps.project.body}`)
    this.setState({
      currentContents: nextProps.project.body
    })
  }

  // create grid to contain editor (semantic)
  render() {
    return (

        <div class="ui card" style={{'width':'100%', 'padding':'.5rem 0 0 0', 'margin-top': '.5rem'}} >
          <div class="content" style={{'padding':'0'}} >
            <div class="center aligned header">Title</div>
          <CodeMirror style={{'height':'40rem'}}
            value={this.state.currentContents}
            options={{
              mode: 'jsx',
              theme: 'ambiance',
              lineNumbers: true,
              indentUnit: 2
            }}
            onBeforeChange={(editor, data, value) => {
              // console.log(`value in onBeforeChange: ${value}`)
              this.setState({
                currentContents: value
              })
              this.props.updateProject(this.state.currentContents, this.props.project.id)
              // this.setState({body: value}, console.log(`body: ${this.state.body}`, `data: ${data}`, `editor: ${editor}`))
              // console.log(`body: ${this.props.project.body}`, `data.text: ${data.text}`, `editor.state: ${Object.keys(editor.state)}`)
            }}
           />
           </div>
           </div>

    );
  }
}

Project.defaultProps = { project: {} }

export default Project