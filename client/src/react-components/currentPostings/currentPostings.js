import React from "react";



import './currentPostings.css'
import NavigationBar from '../Navbar/NavigationBar'
import { withRouter } from 'react-router'
import { viewProfile, viewPost, deletePost, getMyInfo, getPosts, toggleResolve } from '../../actions/posts'
import RetrievingPost from '../RetrievingPost/RetrievingPost'


class currentPostings extends React.Component {
  state = {
    isFetching: true
  }

  componentDidMount = async () => {
    await getMyInfo(this, localStorage.getItem("id"))
    await getPosts(this, this.state.status)
    this.setState({ isFetching: false })
  }


  render() {

    const { status } = this.state
    const { posts } = this.state









    if (this.state.isFetching) {
      return <div>Loading...</div>
    } else {
      return (

        <div>
          <NavigationBar status={status} />
          <div className="content">
            <p className="formTitle">Posts</p>



            <RetrievingPost
              posts={posts}
              viewPost={viewPost}
              deletePost={deletePost}
              viewProfile={viewProfile}
              toggleResolve={toggleResolve}
              status={status}
              postPage={this}
            />










          </div>
        </div>
      )

    }
  }
}
export default withRouter(currentPostings);