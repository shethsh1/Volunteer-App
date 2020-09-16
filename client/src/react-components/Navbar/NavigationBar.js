import React from "react";

// navbar
import { NavLink, withRouter } from 'react-router-dom';
import './NavigationBar.css'



class NavigationBar extends React.Component {

  clear = () => {
    localStorage.clear();
    this.props.history.push("/")
  }

  render() {

    const { status } = this.props


    if (status === "Admin") {
      return (
        <div>

          <div className="sidebar">


            <ul className="sideList">


              <li>
                <NavLink to="/help"><i class="fa fa-archive"></i>View All Post</NavLink>
              </li>

              <li>
                <NavLink to={"/profile/" + localStorage.getItem("id")}><i class="fa fa-user fa-lg"></i>Profile</NavLink>
              </li>

              <li>
                <NavLink to="/admin"><i class="fa fa-user-circle" aria-hidden="true"></i>Admin Panel</NavLink>
              </li>

              <li>
                <div onClick={this.clear}><i class="fa fa-power-off fa-lg"></i>Logout</div>
              </li>

            </ul>
          </div>

        </div>

      );
    } else if (status === "Volunteer") {
      return (
        <div>

          <div className="sidebar">


            <ul className="sideList">


              <li>
                <NavLink to="/help"><i class="fa fa-question-circle fa-lg" aria-hidden="true"></i>Looking to help?</NavLink>
              </li>

              <li>
                <NavLink to={"/profile/" + localStorage.getItem("id")}><i class="fa fa-user fa-lg"></i>Profile</NavLink>
              </li>


              <li>
                <div onClick={this.clear}><i class="fa fa-power-off fa-lg"></i>Logout</div>
              </li>

            </ul>
          </div>

        </div>

      );

    } else if (status === "User") {

      return (
        <div>

          <div className="sidebar">


            <ul className="sideList">
              <li>
                <NavLink to="/gethelp"><i class="fa fa-question-circle fa-lg" aria-hidden="true"></i>Need help?</NavLink>
              </li>

              <li>
                <NavLink to="/myPosts"><i class="fa fa-archive"></i>View My Posts</NavLink>
              </li>



              <li>
                <NavLink to={"/profile/" + localStorage.getItem("id")}><i class="fa fa-user fa-lg"></i>Profile</NavLink>
              </li>



              <li>
                <div onClick={this.clear}><i class="fa fa-power-off fa-lg"></i>Logout</div>
              </li>

            </ul>
          </div>

        </div>

      );
    }
  }
}

export default withRouter(NavigationBar);