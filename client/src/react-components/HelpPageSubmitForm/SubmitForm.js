import React from "react";
import { FormControl, InputLabel, TextField, Select, MenuItem, Button, Grid } from '@material-ui/core';
class SubmitForm extends React.Component {




  render() {

    const { message, title, location, date, time, peopleNeeded, description, handleHelpForm, page } = this.props




    return (

      <div className="formContainer">

        <h2 className="text-center"><u>Help Form</u></h2>
        <p className="messageForm">{message}</p>



        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Title of Post"
              value={title}
              required
              onChange={page.handleChange}
              name="title"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="People Needed"
              value={peopleNeeded}
              required
              onChange={page.handleChange}
              name="peopleNeeded"
              variant="outlined"
              type="number"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField

              label="date"
              type="date"

              value={date}
              required
              onChange={page.handleChange}
              name="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}


            />
          </Grid>

          <Grid item xs={6}>
            <TextField


              type="time"

              id="time"
              label="Preferred time"
              InputLabelProps={{
                shrink: true,
              }}
              value={time}
              required
              onChange={page.handleChange}
              name="time"
              variant="outlined"

            />
          </Grid>

          <Grid item xs={12} justify={"left"}>
            <FormControl id="menustuff" variant="outlined">
              <InputLabel>Location</InputLabel>
              <Select
                name="location"
                onChange={page.handleChange}
                value={location}
              >

                <MenuItem value={"City Centre"}>City Centre</MenuItem>
                <MenuItem value={"Don Valley"}>Don Valley</MenuItem>
                <MenuItem value={"Scarborough"}>Scarborough</MenuItem>
                <MenuItem value={"Etobicoke"}>Etobicoke</MenuItem>
                <MenuItem value={"Mississauga"}>Mississauga</MenuItem>
              </Select>
            </FormControl>
          </Grid>



          <Grid item xs={12}>
            <TextField

              multiline
              rows={10}
              rowsMax={4}
              variant="outlined"
              label="Description of why you need help"

              value={description}
              required
              onChange={page.handleChange}
              name="description"
            />
          </Grid>





          <Grid item xs={12}>

            <Button className="col text-center" variant="contained" color="primary" onClick={() => handleHelpForm(page)}>Create</Button>
          </Grid>
        </Grid>




      </div>
















    );
  }
}

export default SubmitForm;