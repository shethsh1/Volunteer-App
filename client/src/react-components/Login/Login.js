import React from "react";
import './Login.css'
import { withRouter } from 'react-router-dom';
import { handleLogin } from '../../actions/account'
import LoginForm from '../LoginForm/LoginForm'

class Login extends React.Component {


  state = {
    username: '',
    password: '',
    errorMessage: null
  }



  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  };






  render() {

    const username = this.state.username;
    const password = this.state.password;
    const errorMessage = this.state.errorMessage;
    const { app } = this.props

    return (
      <div>
        <div className="loginBox">


          <LoginForm
            username={username}
            password={password}
            errorMessage={errorMessage}
            handleLogin={handleLogin}
            account={this}
            app={app}
          />


        </div>




      </div>

    );
  }
}

export default withRouter(Login);