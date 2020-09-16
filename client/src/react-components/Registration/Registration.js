import React from "react";
import './Registration.css'
import { handleRegistration } from '../../actions/account'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
class Registration extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    status: '',
    errorMessage: '',
    successMessage: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }



  render() {
    const { firstName, lastName, username, email, password, confirmPassword, errorMessage, successMessage, age, gender, status } = this.state




    return (
      <div>


        <RegistrationForm
          firstName={firstName}
          lastName={lastName}
          username={username}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          errorMessage={errorMessage}
          successMessage={successMessage}
          age={age}
          gender={gender}
          status={status}
          handleRegistration={handleRegistration}
          account={this}

        />






      </div >

    );
  }
}

export default Registration;