import React from "react";
import { NavLink } from 'react-router-dom';
import { FormControl, InputLabel, TextField, Select, MenuItem, Button } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

class RegistrationForm extends React.Component {




  render() {

    const { firstName, lastName, username, email, password, confirmPassword, age, gender, errorMessage, successMessage, handleRegistration, account, status } = this.props



    return (
      <div>



        <div id="registrationForm" className="RegisterBox">

          <div className="updateTitle">Registration</div>



          <div className="errorUpdateMessage">{errorMessage}</div>
          <div className="successMessage">{successMessage}</div>

          <Grid container spacing={3} >
            <Grid item xs={6}>
              <TextField
                label="First Name"
                id="margin-normal"
                value={firstName}
                margin="normal"
                required
                onChange={account.handleChange}
                name="firstName"

              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Last Name"
                id="margin-normal"

                margin="normal"
                required
                value={lastName}
                onChange={account.handleChange}
                name="lastName"


              />
            </Grid>


            <Grid item xs={6}>
              <TextField
                label="Username"
                id="margin-normal"

                margin="normal"
                required
                value={username}
                onChange={account.handleChange}
                name="username"

              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Email"
                id="margin-normal"

                margin="normal"
                required
                value={email}
                onChange={account.handleChange}
                name="email"

              />
            </Grid>





            <Grid item xs={6}>
              <TextField
                label="Password"
                id="margin-normal"

                margin="normal"
                required
                type="password"
                value={password}
                onChange={account.handleChange}
                name="password"

              />



            </Grid>


            <Grid item xs={6}>
              <TextField
                label="Confirm Password"
                type="password"
                id="margin-normal"
                margin="normal"
                required
                value={confirmPassword}
                onChange={account.handleChange}
                name="confirmPassword"

              />
            </Grid>





            <Grid item xs={6}>
              <TextField
                label="Age"
                value={age}
                name="age"
                type="number"
                onChange={account.handleChange}
              />

            </Grid>







            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  onChange={account.handleChange}
                  value={gender}
                >

                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Neither"}>Neither</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined">
                <InputLabel>User Type</InputLabel>
                <Select
                  name="status"
                  onChange={account.handleChange}
                  value={status}

                >


                  <MenuItem value={"Volunteer"}>Volunteer</MenuItem>
                  <MenuItem value={"User"}>User</MenuItem>
                </Select>
              </FormControl>
            </Grid>










          </Grid>
          <Button onClick={() => handleRegistration(account)} className="updateReg" variant="contained" color="secondary">Create</Button>
          <NavLink className="registerSignUp" to="/">Already have an account?</NavLink>









        </div>











      </div>

    );
  }
}

export default RegistrationForm;