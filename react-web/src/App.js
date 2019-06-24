import React from 'react';
import './App.css';
import Routes from './Routes';
import { logout } from './services/auth';

class App extends React.Component {
  componentDidMount() {
    logout();
  }  
  render() {
    return (
      <>
        <Routes />
      </>
    );
  }
}

export default App;
