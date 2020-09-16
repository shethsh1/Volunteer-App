import React from "react";
import { NavLink } from 'react-router-dom';

class LoginForm extends React.Component {




  render() {

    const { username, password, errorMessage, handleLogin, account, app } = this.props



    return (
      <div>


        <p className="loginTitle">Login</p>


        <p className="placeTitle">Username</p>


        <input
          name="username"
          value={username}
          onChange={account.handleChange}
          type="text"
          className="username"
        />


        <p className="placeTitle">Password</p>


        <input
          name="password"
          value={password}
          onChange={account.handleChange}
          type="password"
          className="password"
        />

        <button onClick={() => handleLogin(account, app)} className="loginSubmit" type="submit">Login</button>
        <span className="errorMessage">{errorMessage}</span>
        <NavLink className="signUp" to="/signup">Don't have an account?</NavLink>





      </div>

    );
  }
}

export default LoginForm;