import React from "react";
import { FormControl, InputLabel, TextField, Select, MenuItem, Button } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


class UpdateAndCreateForm extends React.Component {





  render() {

    const { admin, errorMessage, firstName, lastName, username, email, password, confirmPassword, age, gender, addAccountToState, updateAccount, status, open } = this.props




    return (
      <div>


        <Dialog
          className="dialogForm"
          open={open}
          onClose={() => admin.setState({ open: false })}
        >

          <div id="updateForm">
            {admin.state.activateUpdateForm ?

              <DialogTitle>Update Form</DialogTitle>
              :
              <DialogTitle>Create Form</DialogTitle>

            }
            <div className="errorUpdateMessage">{errorMessage}</div>

            <Grid container spacing={3} >
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  id="margin-normal"
                  value={firstName}
                  margin="normal"
                  required
                  onChange={admin.handleSelectChange}
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
                  onChange={admin.handleSelectChange}
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
                  onChange={admin.handleSelectChange}
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
                  onChange={admin.handleSelectChange}
                  name="email"

                />
              </Grid>

              {admin.state.activateCreateForm ?



                <Grid item xs={6}>
                  <TextField
                    label="Password"
                    id="margin-normal"
                    type="password"
                    margin="normal"
                    required
                    value={password}
                    onChange={admin.handleSelectChange}
                    name="password"

                  />



                </Grid>
                : null}
              {admin.state.activateCreateForm ?
                <Grid item xs={6}>
                  <TextField
                    label="Confirm Password"
                    id="margin-normal"
                    margin="normal"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={admin.handleSelectChange}
                    name="confirmPassword"

                  />
                </Grid>


                : null
              }

              <Grid item xs={6}>
                <TextField
                  label="Age"
                  value={age}
                  name="age"
                  type="number"
                  onChange={admin.handleSelectChange}
                />

              </Grid>







              <Grid item xs={6}>
                <FormControl>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    onChange={admin.handleSelectChange}
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
                    onChange={admin.handleSelectChange}
                    value={status}

                  >

                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"Volunteer"}>Volunteer</MenuItem>
                    <MenuItem value={"User"}>User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>



              <Grid container item xs={6} justify="center">

                {admin.state.activateCreateForm ?
                  <Button onClick={() => addAccountToState(admin)} className="updateFormButtons" variant="contained" color="secondary">Create</Button>
                  : null
                }

                {admin.state.activateUpdateForm ?
                  <Button onClick={() => updateAccount(admin)} className="updateFormButtons" variant="contained" color="secondary">Update</Button>
                  : null
                }
              </Grid>

              <Grid container item xs={6} justify="center">

                <Button onClick={admin.close} className="updateFormButtons" variant="contained" >Close</Button>
              </Grid>











            </Grid>







          </div>
        </Dialog>


      </div>








    );
  }
}

export default UpdateAndCreateForm;