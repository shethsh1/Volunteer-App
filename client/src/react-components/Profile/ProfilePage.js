import React from "react";

// navbar

import './ProfilePage.css'
import NavigationBar from '../Navbar/NavigationBar'
import { withRouter } from 'react-router'
import EditButton from '../EditButton/EditButton'
import { changeProfile, getProfileInformation, getMyInfo, uploadImage } from '../../actions/profile'
import EditProfileForm from '../ProfilePageEditForm/EditProfileForm'



/* Component for the Input field, a wrapper around MUI TextField */
class ProfilePage extends React.Component {
  state = {
    actualUser: false,
    firstNameForm: false,
    lastNameForm: false,
    genderForm: false,
    ageForm: false,
    locationForm: false,
    currStatus: ''

  }


  constructor(props) {
    super(props);


    const id = this.props.match.params.id;
    if (localStorage.getItem("id") === id) {
      this.state.actualUser = true;

    } else if (id === undefined || id === null || id === '') {
      this.props.history.push("/profile/" + localStorage.getItem('id'))
    }

  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    getProfileInformation(this, id)
    getMyInfo(this, localStorage.getItem("id"))


    if (this.state.actualUser) {
      const element = document.getElementById('editingProfile')
      if (element)
        element.addEventListener('click', this.uploadingImage);
    }
  }


  handleProfileChange = (event) => {
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }

  uploadingImage = () => {
    document.getElementById('upClick').click();
  }


  changeToEdit = (event) => {
    const name = event.target.name
    this.setState({
      [name]: true
    })
  }



  goToMyPosts = () => {
    this.props.history.push("/myPosts")
  }










  render() {

    // {status, username, firstName, lastName} = this.props.state.users[];

    const { firstName, lastName, username, status, age, gender, actualUser, image, location, currStatus } = this.state









    return (
      <div>

        {currStatus ?
          <NavigationBar status={currStatus} />
          : null
        }



        <div className="content">

          <div className="profileLine">

          </div>




          <div className="profileBackground">

            <img alt="edit" className="profilePicture" src={image} />
            <input id='upClick' type='file' hidden onChange={(event) => uploadImage(event, this)} />
            <EditButton actualUser={actualUser} id="editingProfile" className="editProfile" src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} />




          </div>

          {actualUser ?
            [
              status === "Admin" || status === "Volunteer" ?
                <button key="fill" onClick={this.goToMyPosts} className="viewPost">View all post</button>

                :
                <button key="but" onClick={this.goToMyPosts} className="viewPost">View my post</button>

            ]
            : null}



          <EditProfileForm
            category={"Username"}
            actualUser={actualUser}
            EditButton={EditButton}
            value={username}
            profile={this}
            usernameOrStatus={true}
          />




          <EditProfileForm
            category={"First Name"}
            form={this.state.firstNameForm}
            changeProfile={changeProfile}
            actualUser={actualUser}
            EditButton={EditButton}
            id={"firstNameForm"}
            name={"firstName"}
            value={firstName}
            profile={this}
          />


          <EditProfileForm
            category={"Last Name"}
            form={this.state.lastNameForm}
            changeProfile={changeProfile}
            actualUser={actualUser}
            EditButton={EditButton}
            id={"lastNameForm"}
            name={"lastName"}
            value={lastName}
            profile={this}
            ageOrGender={false}
          />




          <EditProfileForm
            category={"Age"}
            form={this.state.ageForm}
            changeProfile={changeProfile}
            actualUser={actualUser}
            EditButton={EditButton}
            id={"ageForm"}
            name={"age"}
            value={age}
            profile={this}
            ageOrGender={true}
            number={true}
          />


          <EditProfileForm
            category={"Gender"}
            form={this.state.genderForm}
            changeProfile={changeProfile}
            actualUser={actualUser}
            EditButton={EditButton}
            id={"genderForm"}
            name={"gender"}
            value={gender}
            profile={this}
            ageOrGender={true}
            number={false}
          />

          <EditProfileForm
            category={"Location"}
            form={this.state.locationForm}
            changeProfile={changeProfile}
            actualUser={actualUser}
            EditButton={EditButton}
            id={"locationForm"}
            name={"location"}
            value={location}
            profile={this}

          />



          <EditProfileForm
            category={"Status"}
            actualUser={actualUser}
            EditButton={EditButton}
            value={status}
            profile={this}
            usernameOrStatus={true}
          />









        </div>



      </div>

    );
  }
}

export default withRouter(ProfilePage);