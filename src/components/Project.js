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
    // <Project id: 1, created_at: "2018-04-15 13:55:49", updated_at: "2018-04-15 13:55:49", user_id: 1, title: "project one", body: "project one body">
    this.state = {
      // value: 'console.log("hello world")'
      body: this.props.currentProject.body
    }
  }
  
  render() {
    return (
      <div className="ui container" style={{'marginTop':'1rem'}}>
        <Segment raised>
          <CodeMirror
            value={this.state.body}
            options={{
              mode: 'jsx',
              theme: 'ambiance',
              lineNumbers: true,
              indentUnit: 2
            }}
            onBeforeChange={(editor, data, value) => {
              this.setState({body: value});
            }}
            onChange={(editor, data, value) => {
              console.log(this.state.body)
            }}
          />
        </Segment>
      </div>
    );
  }
}

export default Project