import React from 'react';
import { Container, Modal, Button } from 'react-bootstrap';

export default class ModalDetails extends React.Component{
  state = {
    item: null,
    show: true
  }
  componentDidMount() {
    this.setState({item: this.props.item});
  }
  handleClose = () => {
    this.setState({ item: null });
  }
  componentWillReceiveProps () {
    console.log('atualizou');
    this.setState({item: this.props.item })
  }

  render() {
    if(this.state.item !== null){
      return(
        <Container style={{width: '100vw', minHeight: '100vh', position: 'fixed'}}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.item.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Container>
      );
    }
    else{
      return null
    }
  }
}