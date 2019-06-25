import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Form, Container, H1 } from "./Styles";

import axios from 'axios';

import api from '../services/api';
import { login, logout } from "../services/auth";


class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    if ( !name || !email || !password ) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        api.post(`/user/register`, { name, email, password })
         .then(resp => {
            if(resp.data.data.token !== undefined){
              login(resp.data.data.token);            
              this.props.history.push("/beers");        
            }
          })
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    }
  };

  render() {
    return (
      <Container className="signup-container">
          <H1>Registro de usuários</H1>
          {this.state.error && <p style={{color: 'red'}}>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit" onClick={(e) => this.handleSignUp(e)}>Cadastrar grátis</button>
          <Link className="link" to="/">Login</Link>
        
      </Container>
    );
  }
}

export default SignUp;