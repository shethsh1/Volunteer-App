import React from "react";



import './HelpPage.css'
import NavigationBar from '../Navbar/NavigationBar'
import { withRouter } from 'react-router'
import { handleHelpForm, getMyInfo } from '../../actions/posts'
import SubmitForm from '../HelpPageSubmitForm/SubmitForm'


/* Component for the Input field, a wrapper around MUI TextField */
class HelpPage extends React.Component {

  state = {
    "title": '',
    "location": '',
    "date": '',
    "peopleNeeded": '',
    "description": '',
    "message": '',
    isFetching: true
  }

  componentDidMount = async () => {
    await getMyInfo(this, localStorage.getItem("id"))
    this.setState({ isFetching: false })
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  clear = () => {
    this.setState({
      "title": '',
      "location": '',
      "date": '',
      "time": '',
      "peopleNeeded": '',
      "description": '',
      "message": 'Success'
    })
    document.querySelector(".messageForm").style.color = "green"


  }


  render() {

    const { title, location, date, peopleNeeded, description, message, time } = this.state
    const { status } = this.state


    if (this.state.isFetching) {
      return <div>Loading...</div>
    } else {

      return (
        <div>

          <NavigationBar status={status} />

          <div className="content">


            <SubmitForm
              message={message}
              title={title}
              location={location}
              date={date}
              time={time}
              peopleNeeded={peopleNeeded}
              description={description}
              handleHelpForm={handleHelpForm}
              page={this}
            />




          </div>



        </div>

      );
    }
  }
}

export default withRouter(HelpPage);