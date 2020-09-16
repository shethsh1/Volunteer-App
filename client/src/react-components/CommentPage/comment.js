import React from "react";
import NavigationBar from '../Navbar/NavigationBar'
import Grid from "@material-ui/core/Grid";

import './comment.css'
import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from '@material-ui/core/Chip';
import { viewProfile, viewPost, deletePost, getMyInfo, getPosts } from '../../actions/posts'
import { getPostAndComments, submitComment, toggleResolve, submitReply, nestedCommentsHandler } from '../../actions/comments'
import { withRouter } from 'react-router'

// <img src="https://res.cloudinary.com/dzuvioe6w/image/upload/v1597279271/nri7mjuk/xushpnkikvrmkhry5gic.png" />


import { TextField, Button } from '@material-ui/core';

class comment extends React.Component {
  state = {
    isFetching: true,
    comment: '',
    post: [],
    open: false,
    openReplyForm: false,
    commentId: '',
    reply: ''
  }



  componentDidMount = async () => {
    await getMyInfo(this, localStorage.getItem("id"))
    const postId = this.props.match.params.id;
    await getPostAndComments(this, postId)
    if (this.state.post.length === 0) {
      this.props.history.push(`/profile/${localStorage.getItem("id")}`)
    }
    this.setState({ isFetching: false })



  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }





  openReplyForm = (id) => {
    this.setState({
      commentId: id,
      openReplyForm: true,
    })
    // /users/posts/reply/:id/:commentId
    console.log(id)

  }




  closeAll = () => {
    this.setState({
      open: false,
      comment: '',
      openReplyForm: false,
      commentId: '',
      reply: '',
    })
  }








  render() {
    if (this.state.isFetching) {
      return <div>Loading...</div>
    } else {
      const { post, status } = this.state
      const treeComments = post.comments


      const actualPost =
        <div id="truepost" className="commentx" key={post._id}>
          <div className="leftside">
            <img src={post.image} />
            <p onClick={() => viewProfile(post.author, this)} className="imageText"><a href="">{post.username}</a></p>
            <p className="status">{post.status}</p>
          </div>
          <div className="currContent">
            <div className="buttons">



              {post.resolved ?
                <Button onClick={() => toggleResolve(this, post, status)} className="view resolved" variant="contained">
                  resolved
                </Button>

                :
                <Button onClick={() => toggleResolve(this, post, status)} className="view unresolved" variant="contained">
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

      const allComments = nestedCommentsHandler(treeComments, this)







      return (

        <div>

          <NavigationBar status={status} />


          <div className="content">



            <Dialog

              open={this.state.openReplyForm}
              onClose={this.closeAll}
            >

              <div className="setPads">


                <DialogTitle><h5 className="text-center">Reply Form</h5></DialogTitle>



                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <TextField

                      multiline
                      rows={2}

                      variant="outlined"
                      label="Write a comment"

                      value={this.state.reply}
                      required
                      onChange={this.handleChange}
                      name="reply"
                    />
                  </Grid>










                  <Grid container item xs={6} justify="center">

                    <Button onClick={() => submitReply(this)} variant="contained" color="primary">Submit</Button>
                  </Grid>



                  <Grid container item xs={6} justify="center" >
                    <Button onClick={this.closeAll} variant="contained" color="secondary">
                      Close
                    </Button>
                  </Grid>


                </Grid>

              </div>
            </Dialog>




















            <Dialog
              fullWidth={true}
              maxWidth={"md"}
              open={this.state.open}
              onClose={() => this.setState({ open: false })}
            >

              <div className="setPads">


                <DialogTitle><h2 className="text-center">Create Comment Form</h2></DialogTitle>



                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <TextField

                      multiline
                      rows={20}
                      rowsMax={10}
                      variant="outlined"
                      label="Write a comment"

                      value={this.state.comment}
                      required
                      onChange={this.handleChange}
                      name="comment"
                    />
                  </Grid>










                  <Grid container item xs={6} justify="center">
                    <Button onClick={() => submitComment(this)} variant="contained" color="primary">
                      Create
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







            {actualPost}


            <div className="containerr2">

              <Grid container spacing={3}>
                <Grid item xs={12} container justify="center">
                  <Button onClick={() => this.setState({ open: true })} className="buttonComment" variant="contained" color="primary">Create A Comment</Button>

                </Grid>
              </Grid>



            </div>
            <div className="containerr">
              <ul class="comments">
                <li className="mappingtothis">
                  <ul>
                    <li>
                      {allComments}
                    </li>
                  </ul>







                </li>
              </ul>
            </div>




          </div>





        </div>












      );

    }








  }
}

export default withRouter(comment);