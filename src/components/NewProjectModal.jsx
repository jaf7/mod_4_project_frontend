import React from 'react'
import { Form, Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class NewProjectModal extends React.Component {
  constructor() {
    super()

    this.state = {
      formContents: '',
      isOpen: false
    }
  }

  handleOpen = () => this.setState({ isOpen: true })

  handleClose = () => this.setState({ isOpen: false })

  udpateFormValue = (e) => {
    this.setState({
      formContents: e.target.value
    })
  }

  handleClick = (e) => {
    // e.preventDefault()
    this.handleClose()
    this.props.createProject(this.state.formContents)
  }

  render() {
    return (

      <Modal trigger={
           <Button animated color="green" onClick={this.handleOpen} >
              <Button.Content visible>New Project</Button.Content>
              <Button.Content hidden>
                <Icon name='code' />
              </Button.Content>
            </Button>
        } open={this.state.isOpen} onClose={this.handleClose} basic size='small'>
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
