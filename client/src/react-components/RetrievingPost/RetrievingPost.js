import React from "react";
import { Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { FormControl, InputLabel, TextField, Select, MenuItem } from '@material-ui/core';
import { getPosts } from '../../actions/posts'
import Dialog from "@material-ui/core/Dialog";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

class RetrievingPost extends React.Component {
  state = {
    titleSearch: '',
    title: '',
    peopleNeeded: '',
    date: '',
    time: '',
    location: '',
    name: '',
    open: false,
    checkedResolved: false,
    checkedUnresolved: false,

  }



  applySearch = async () => {
    await getPosts(this.props.postPage, this.props.status)
    const { posts, postPage } = this.props
    const value = document.querySelector("input[name=titleSearch]").value
    const newPosts = posts.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()))
    postPage.setState({ posts: newPosts })
    console.log(newPosts)

  }

  applyAdvancedSearch = async () => {
    const { title, peopleNeeded, date, time, location, checkedResolved, checkedUnresolved, name } = this.state
    console.log(name)
    await getPosts(this.props.postPage, this.props.status)

    const { postPage } = this.props
    const newPosts = postPage.state.posts.filter((post) => {
      const peopleNeededCheck = peopleNeeded === '' || post.peopleNeeded == peopleNeeded
      const titleCheck = post.title.toLowerCase().includes(title.toLowerCase())
      const dateCheck = date === '' || post.date === date
      const timeCheck = time === '' || post.time === time
      const locationCheck = location === '' || post.location === location
      const nameCheck = name === '' || post.username.toLowerCase() === name.toLowerCase()





      if (peopleNeededCheck && titleCheck && dateCheck && timeCheck && locationCheck && nameCheck) {
        if (!checkedResolved && !checkedUnresolved) {
          return post
        } else if (checkedUnresolved === true && checkedResolved === false) {
          if (post.resolved) {
            return post
          }
        } else if (checkedResolved === true && checkedUnresolved === false) {
          if (!post.resolved) {
            return post
          }

        }
      }
    })
    postPage.setState({ posts: newPosts })
    this.clearAll()
  }

  clearAll = () => {
    this.setState({
      titleSearch: '',
      title: '',
      peopleNeeded: '',
      date: '',
      time: '',
      location: '',
      name: '',
      checkedResolved: false,
      checkedUnresolved: false,
      open: false
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  toggleResolve = (event) => {
    console.log("reached")
    this.setState({
      checkedResolved: !this.state.checkedResolved

    })
  }

  toggleUnresolve = (event) => {
    console.log("reached")
    this.setState({
      checkedUnresolved: !this.state.checkedUnresolved

    })
  }









  render() {
    const { posts, viewPost, deletePost, getPostInformation, viewProfile, toggleResolve, status, postPage } = this.props




    const postInfo = posts.map(post =>
      <div id="truepost" className="commentx" key={post._id}>
        <div className="leftside">
          <img src={post.image} />
          <p onClick={() => viewProfile(post.author, postPage)} className="imageText"><a href="">{post.username}</a></p>
        </div>
        <div className="currContent">
          <div className="buttons">
            <Button variant="contained" color="primary" className="view" onClick={() => viewPost(post._id, postPage)} >View</Button>
            {status === "Admin" || status === "User" ?
              <Button variant="contained" color="secondary" className="view" onClick={() => deletePost(post, postPage)}>Delete</Button>
              : null
            }


            {post.resolved ?
              <Button onClick={() => toggleResolve(post, postPage, status)} className="view resolved" variant="contained">
                resolved
              </Button>

              :
              <Button onClick={() => toggleResolve(post, postPage, status)} className="view unresolved" variant="contained">
                unresolved
            </Button>
            }
          </div>
          <h3>{post.title}</h3>
          <p className="grey">{post.location}</p>
          <p>{post.description}</p>

          <div className="theTags">

            <Chip className="tags" label={`people needed: ${post.peopleNeeded}`} />
            <Chip className="tags" label={post.date} />
            <Chip className="tags" label={post.time} />
            <Chip className="tags" label={post.location} />
          </div>

          <div className="thedate">
            {post.creationDate}
          </div>
        </div>


      </div>


    ).reverse();





    return (
      <div>
        <div className="searchbar">
          <input id="searchbarTitle" name="titleSearch" type="text" className="form-control input-sm" maxlength="30" placeholder="Search for title" />
          <button type="submit" onClick={this.applySearch} className="btn btn-primary btn-sm"><span class="fa fa-search"></span></button>
        </div>
        <div className="advanced">



          <Button className="buttonForm" variant="outlined" onClick={() => this.setState({ open: true })}>Advanced Search</Button>
          <Dialog
            open={this.state.open}
            onClose={() => this.setState({ oppen: false })}
          >

            <div className="setPads">

              <DialogTitle><h2 className="text-center">Advanced Search</h2></DialogTitle>
              <h5>Find post with...</h5>


              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Title of Post"
                    value={this.state.title}

                    onChange={this.handleChange}
                    name="title"
                    variant="outlined"
                  />
                </Grid>


                <Grid item xs={12}>
                  <TextField
                    label="Author of Post"
                    value={this.state.name}

                    onChange={this.handleChange}
                    name="name"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="People Needed"
                    value={this.state.peopleNeeded}

                    onChange={this.handleChange}
                    name="peopleNeeded"
                    variant="outlined"
                    type="number"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField

                    label="date"
                    type="date"

                    value={this.state.date}

                    onChange={this.handleChange}
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
                    value={this.state.time}

                    onChange={this.handleChange}
                    name="time"
                    variant="outlined"

                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl id="menustuff" variant="outlined">
                    <InputLabel>Location</InputLabel>
                    <Select
                      name="location"
                      onChange={this.handleChange}
                      value={this.state.location}
                    >

                      <MenuItem value={"City Centre"}>City Centre</MenuItem>
                      <MenuItem value={"Don Valley"}>Don Valley</MenuItem>
                      <MenuItem value={"Scarborough"}>Scarborough</MenuItem>
                      <MenuItem value={"Etobicoke"}>Etobicoke</MenuItem>
                      <MenuItem value={"Mississauga"}>Mississauga</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item container xs={6} justify="center">
                  <FormControlLabel
                    control={
                      <Checkbox


                        checked={this.state.checkedResolved}
                        onChange={this.toggleResolve}
                        name="time"
                      />
                    }
                    label="Hide resolved"
                  />

                </Grid>

                <Grid item container xs={6} justify="center">
                  <FormControlLabel
                    control={
                      <Checkbox


                        checked={this.state.checkedUnresolved}

                        onChange={this.toggleUnresolve}
                        name="time"
                      />
                    }
                    label="Hide unresolved"
                  />

                </Grid>









                <Grid container item xs={6} justify="center">
                  <Button onClick={this.applyAdvancedSearch} variant="contained" color="primary">
                    Search
                  </Button>
                </Grid>
                <Grid container item xs={6} justify="center" >
                  <Button onClick={() => this.setState({ open: false })} variant="contained" color="secondary">
                    Close
                  </Button>
                </Grid>


              </Grid>
            </div>
          </Dialog>
        </div>
        {postInfo}
      </div >



    );
  }
}

export default RetrievingPost;