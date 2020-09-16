import React from "react";


import './AdminPanel.css'
import NavigationBar from '../Navbar/NavigationBar'
import { withRouter } from 'react-router'
import AccountsList from '../AdminPanelAccountsList/AccountsList'
import UpdateAndCreateForm from '../AdminPanelUpdateAndCreateForm/UpdateAndCreateForm'
import { getMyInfo } from '../../actions/profile'
import { getUpdateForm, addAccountToState, updateAccount, addAccount, deleteT, checkProfile, viewAllPost, getAccounts } from '../../actions/admin'


class AdminPanel extends React.Component {
  state = {
    "username": "",
    "status": "",
    "firstName": "",
    "lastName": "",
    "age": '',
    "gender": '',
    "email": "",
    "activateUpdateForm": false,
    "id": '',
    "errorMessage": '',
    "password": "",
    "confirmPassword": "",
    "excludeId": [],
    open: false,
    isFetching: true



  }

  componentDidMount = async () => {
    await getMyInfo(this, localStorage.getItem("id"))
    await getAccounts(this)
    this.setState({ isFetching: false })




  }





  handleSelectChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }



  close = () => {
    this.setState({
      "username": "",
      "status": "",
      "firstName": "",
      "lastName": "",
      "age": '',
      "gender": '',
      "email": "",
      "activateUpdateForm": false,
      "activateCreateForm": false,
      "id": '',
      "errorMessage": '',
      "password": "",
      "confirmPassword": "",
      open: false


    })
  }


  render() {


    const { users } = this.state
    const { username, gender, age, firstName, lastName, status, email, errorMessage, password, confirmPassword, open } = this.state
    const { currStatus } = this.state





    if (this.state.isFetching) {
      return <div>Loading...</div>
    } else {
      return (

        <div>


          <NavigationBar status={currStatus} />



          <div className="content">

            <div className="title">
              <span className="adminText">
                Admin Panel
            </span>
            </div>



            <br />

            <button onClick={() => viewAllPost(this)} className="viewAllPosts">View All Posts</button>

            <br />



            <AccountsList
              users={users}
              deleteT={deleteT}
              getUpdateForm={getUpdateForm}
              admin={this}
              checkProfile={checkProfile}
            />




            <button onClick={() => addAccount(this)} className="add">Add an account</button>


            <hr />

            <UpdateAndCreateForm

              admin={this}
              errorMessage={errorMessage}
              firstName={firstName}
              lastName={lastName}
              username={username}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              age={age}
              gender={gender}
              addAccountToState={addAccountToState}
              updateAccount={updateAccount}
              status={status}
              open={open}

            />






          </div>









        </div>

      );
    }
  }
}

export default withRouter(AdminPanel);