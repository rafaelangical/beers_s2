import React from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default class ModalDetails extends React.Component{
  state = {
    item: null,
    show: false,
    id: null
  }

  async fetchData() {
    await axios.get(`https://api.punkapi.com/v2/beers/${this.props.id + 1}`)
      .then(resp => {
        //console.log(resp.data);
        this.setState({item: resp.data[0], show: this.props.show});
      }
    )
  }

  async componentDidMount() {
    await this.setState({ id: this.props.id});
    await this.fetchData();
  }

  async UNSAFE_componentWillReceiveProps() {
    console.log(`atualizou as props filho will receive UNSAFE modal: ${this.props.id}`);
    await this.fetchData();
  }

  //async UNSAFE_componentWillUpdate(){
  //  console.log('unsafe');
  //  console.log(`atualizou as props filho component willupdate unsafe modal: ${this.props.id}`);
  //  this.setState({id: this.props.id});
  //}

  handleClose = () => {
    this.setState({ show: false, id: null });
  }

  render() {
    if(this.state.item !== null && this.state.show){
      return(
        <Container style={{minWidth: '100vw', minHeight: '100vh', top: '5%', left: 0, right: 0, bottom: 0, position: 'fixed', flexDirection: 'column'}}>
          <Modal.Dialog style={{width: '80%', alignContent: 'center', margin: '0 auto', justifyContent: 'center'}}>
            <Modal.Header>
              <Modal.Title style={{color: 'red'}}>{this.state.item.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{overflow:'hidden'}}>
              <img src={this.state.item.image_url} alt="cerveja" className="cerveja-image"/>
              <p>{this.state.item.description}</p>
              <strong>First breweb: <span>{this.state.item.first_brewed}</span></strong>
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
      return false
    }
  }
}