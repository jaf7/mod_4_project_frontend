import React from 'react'
import { Form, Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class NewProjectModal extends React.Component {
  constructor() {
    super()

    this.state = {
      formContents: ''
    }
  }

  udpateFormValue = (e) => {
    this.setState({
      formContents: e.target.value
    })
  }

  handleClick = (e) => {
    this.props.createProject(this.state.formContents)
    this.props.handleModalClose()
  }

  render() {
    return (

      <Modal open={this.props.modalState} basic size='small'>
        <Header icon='edit' content='Create New Project' />
        <Modal.Content>
          <Form onChange={this.udpateFormValue} >
            <Form.Field>
              <label>Project Name</label>
              <input placeholder='Project Name' />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={this.handleClick} >
            <Icon name='checkmark' /> Create
          </Button>
        </Modal.Actions>
      </Modal>

    )
  }
}

