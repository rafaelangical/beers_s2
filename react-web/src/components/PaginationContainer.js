import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { fetchBeers } from '../actions';


class PaginationContainer extends React.Component {
  
  state = {
    per_page: 20,
    page: 1
  }

  async getMoreBeers() {
    const { fetchBeers } = await this.props;
    const { per_page, page } = await this.state;
    await fetchBeers(page, per_page);
  }  
  
  async getMoreResults() {
    if(this.state.per_page >= 70){
      await this.setState({page: this.state.page += 1, per_page: 20})
      await this.getMoreBeers();
    }else{
      await this.setState({per_page: this.state.per_page += 10})
      await this.getMoreBeers();
    }
    
  }
  render() {
    return (
      <div className="div-button-paginate">
        <button className="button-paginate" onClick={() => this.getMoreResults()}>Carregar mais</button>
      </div>
    );
  }
}
const mapDispatchToProps = {
  fetchBeers: fetchBeers,
};

PaginationContainer = connect(null,mapDispatchToProps)(PaginationContainer);

export default PaginationContainer;

