
import React from 'react';


import { Route, Switch, BrowserRouter } from 'react-router-dom';


import { readCookie } from "./actions/account";
import ProfilePage from './react-components/Profile/ProfilePage';
import AdminPanel from './react-components/Admin Panel/AdminPanel';
import HelpPage from './react-components/Help Page/HelpPage';
import Login from './react-components/Login/Login';
import Registration from './react-components/Registration/Registration';
import MyPosts from './react-components/currentPostings/currentPostings';
import CurrentPostings from './react-components/currentPostings/currentPostings';
import Comments from './react-components/CommentPage/comment';
import ErrorPage from './react-components/ErrorPage/ErrorPage'

class App extends React.Component {
  constructor(props) {
    super(props);
    readCookie(this); // sees if a user is logged in.
  }



  state = {

    currentUser: null,

  }



  render() {
    const currUser = localStorage.getItem("id")
    const status = localStorage.getItem("status")



    return (
      <div>
        <BrowserRouter>
          <Switch>


            <Route exact path="/" render={() => (< Login state={this.state} app={this} />)} />
            <Route exact path="/signup" component={Registration}></Route>
            {currUser ?
              <div>

                {status === "Admin" ?
                  <Route exact path="/admin" render={() => (<AdminPanel state={this.state} />)} />
                  : null
                }
                <Route exact path="/profile/:id" render={() => (<ProfilePage state={this.state} app={this} />)} />

                {status === "User" ?
                  <Route exact path="/getHelp" render={() => (<HelpPage state={this.state} />)} />
                  : null
                }
                <Route exact path="/myPosts" render={() => (<MyPosts state={this.state} />)} />
                {status === "Admin" || status === "Volunteer" ?
                  <Route exact path="/help" render={() => (<CurrentPostings state={this.state} />)} />
                  : null
                }

                <Route exact path="/comments/:id" render={() => (<Comments state={this.state} />)} />
              </div>
              : null}

            <Route component={ErrorPage} />



          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;