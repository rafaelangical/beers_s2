import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../services/api";
import { login } from "../services/auth";

import { Form, Container, H1 } from "./Styles";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleLogin = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/user/auth", { email, password });
        if(response.data.data.token !== undefined) {
          login(response.data.data.token);
          this.props.history.push("/beers");
        }else{
          alert("Usuário inválido");
        }
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, algo de errado não está certo !!"
        });
      }
    }
  };

  render() {
    return (
      <Container className="login-container">
        <Form onSubmit={(e) => this.handleLogin(e)}>
          <H1>Login</H1>
          {this.state.error && <p style={{color: 'red'}}>{this.state.error}</p>}
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
          <button type="submit">Entrar</button>
          <hr />
          <Link className="link" to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Login);