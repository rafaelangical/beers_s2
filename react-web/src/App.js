import React from 'react';
import './App.css';
import Routes from './Routes';
import { logout } from './services/auth';
import { connect } from 'react-redux';
import { fetchBeers } from '../src/actions';

class App extends React.Component {
  async componentDidMount() {
    await logout();
    const { fetchBeers } = await this.props;
    await fetchBeers(1, 20);
  }  
  render() {
    return (
      <>
        <Routes />
      </>
    );
  }
}
const mapDispatchToProps = {
  fetchBeers: fetchBeers,
};

App = connect(null,mapDispatchToProps)(App);

export default App;

