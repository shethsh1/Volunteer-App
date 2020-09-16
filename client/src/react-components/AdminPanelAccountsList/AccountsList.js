import React from "react";

class AccountsList extends React.Component {




  render() {
    const { users, deleteT, getUpdateForm, admin, checkProfile } = this.props

    const accountInfo = users.map(o =>

      <tr key={o._id} id={o._id}>
        <td onClick={() => checkProfile(o._id, admin)}>{o.username}</td>
        <td>{o.firstName}</td>
        <td>{o.lastName}</td>
        <td>{o.email}</td>
        <td>{o.status}</td>
        <td>
          <button onClick={() => deleteT(o._id, admin, o.status)} className="deleteAdmin">Delete</button>
        </td>
        <td>
          <button onClick={() => getUpdateForm(o._id, admin)} className="update">Update</button>
        </td>
      </tr>
    ).reverse();



    return (

      <table id="adminTable">
        <tbody>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th></th>
            <th></th>
          </tr>
          {accountInfo}
        </tbody>

      </table>






    );
  }
}

export default AccountsList;