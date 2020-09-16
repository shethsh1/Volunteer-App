import React from "react";

class EditProfileForm extends React.Component {

  render() {
    const { category, form, name, value, changeProfile, profile, id, actualUser, EditButton, ageOrGender, number, usernameOrStatus } = this.props

    if (!ageOrGender && !usernameOrStatus) {


      return (
        <div>






          <div className="basicInfo">

            <span className="left">{category}</span>

            {form ?
              <div>
                <img alt="edit" id={id} name={name} onClick={(event) => changeProfile(event, profile)} className="editPencil" src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} />


                <input
                  name={name}
                  value={value}
                  onChange={profile.handleProfileChange}
                  type="text"
                  className="rightInput"
                />
              </div>

              :
              <div>
                <EditButton actualUser={actualUser} name={id} onClick={profile.changeToEdit} className="editPencil" src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} />

                <span className="right">{value}</span>
              </div>
            }



          </div>







        </div >

      );
    } else if (ageOrGender === true) {
      return (
        <div>


          <div className="basicInfo">

            <span className="left">{category}</span>





            {form ?
              <div>
                <img alt="edit" id={id} name={name} onClick={(event) => changeProfile(event, profile)} className="editPencil" src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} />


                {!number ?
                  <input
                    name={name}
                    value={value}
                    onChange={profile.handleProfileChange}
                    type="text"
                    className="rightInput"
                  />
                  :
                  <input
                    name={name}
                    value={value}
                    onChange={profile.handleProfileChange}
                    type="number"
                    className="rightInput"
                  />
                }
              </div>

              :
              [
                value ?
                  <div key="forms">
                    <EditButton actualUser={actualUser} name={id} onClick={profile.changeToEdit} className="editPencil" src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} />

                    <span className="right">{value}</span>
                  </div>
                  :
                  <div key="editTool">
                    <EditButton actualUser={actualUser} name={id} onClick={profile.changeToEdit} className="editPencil" src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} />

                    <span className="right">Not Specified</span>
                  </div>
              ]

            }





          </div>

        </div>


      );
    } else if (usernameOrStatus === true) {
      return (
        <div>

          <div className="basicInfo">

            <span className="left">{category} </span>
            <EditButton actualUser={actualUser} className="editPencilH" src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} />

            <span className="right">{value}</span>


          </div>

        </div>
      );
    }
  }
}

export default EditProfileForm;