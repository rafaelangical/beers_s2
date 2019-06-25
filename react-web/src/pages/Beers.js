import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

//import { getToken } from '../services/auth';
import ModalDetails from '../components/ModalDetails';

export default class Beers extends Component {
  
  state = {
    data:[],
    per_page: 20,
    page: 1,
    id: null
  }

  async componentDidMount() {
    const { page, per_page } = this.state;
    await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${per_page}`)
    .then(response => {
      console.log(response);
      this.setState({data: response.data});
    })
  }


  async getMoreResults() {
    if(this.state.per_page >= 70){
      this.setState({page: this.state.page += 1, per_page: 20})
      this.componentDidMount();
    }
    this.setState({per_page: this.state.per_page += 10})
    this.componentDidMount();
  }

  async handleDetails(id) {
    console.log(`beer component clicou, id: ${id.index}`);
    await this.setState({ id: id.index });
  }

  // async componentWillUpdate() {
  //   this.setState({id: this.state.id});
  // }

  render() {
    const { data, id } = this.state; 
    return(
    <>
      <div className="Beers-container">
        <h1 className="h1-beers">Beers</h1>
        {data.map ? this.state.data.map((src,index) => {
          return(
            <div className="beers-column" key={index} onClick={() => this.handleDetails({index})}>
              <img src={src.image_url} alt="cerveja" className="cerveja-image"/>
              <p><strong>Name: </strong>{src.name}</p>
              <p><strong>Volume: </strong>{src.volume.value} {src.volume.unit}</p>
              <p><strong>Alcohol by Volume:</strong> {src.abv}</p>
            </div>
          )  
        })
        : null}
        <div className="div-button-paginate">
          <button className="button-paginate" onClick={() => this.getMoreResults()}>Carregar mais</button>
        </div>
        {this.state.id !== null ? <ModalDetails id={this.state.id} show={true}/> : ''}
      </div>
    </>
    )
  }
}
