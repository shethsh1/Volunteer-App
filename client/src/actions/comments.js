
import React from 'react' // react must be in scope for JSX
import { Button } from '@material-ui/core';

const API_HOST_URL = "" // http://localhost:5000 


export const getPostAndComments = async (commentPage, postId) => {
    const url = `${API_HOST_URL}/users/posts/${postId}`;

    await fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                commentPage.setState({ post: json })




            }

        })
        .catch(error => {
            console.log(error);
        });
}


export const submitComment = (commentPage) => {
    const { comment } = commentPage.state
    if (comment === '') {
        return
    }
    const userId = localStorage.getItem("id")
    const postId = commentPage.props.match.params.id
    const body = { userId, detail: comment }

    const request = new Request(`${API_HOST_URL}/users/posts/${postId}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json()

            }
        })
        .then(async json => {
            if (json) {
                getPostAndComments(commentPage, postId)



            }
        })

        .catch(error => {
            console.log(error);
        });

    commentPage.closeAll()

}

export const toggleResolve = async (commentPage, post, status) => {

    if (status === "User") {
        return
    }



    let body = ''

    if (post.resolved === true) {
        body = { resolved: false }
    } else {
        body = { resolved: true }
    }

    const request = new Request(`${API_HOST_URL}/users/posts/${post._id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json()

            }
        })
        .then(async json => {
            if (json) {
                post.resolved = !post.resolved
                commentPage.forceUpdate()

            }
        })

        .catch(error => {
            console.log(error);
        });


}

/*
reference used: how to map through each list element recursively - https://stackoverflow.com/questions/35605008/open-and-close-a-recursively-nested-list-in-react-js
*/

export const nestedCommentsHandler = (curr, commentPage) => {
    return (

        /* used the above reference to figure out how to put multiple mapping function in a single function with recursion
        my code was different but the concept was the same
        */
        curr.map((comment) => {
            return (
                <li>
                    <div className="reply">
                        <div class="leftside">
                            <img src={comment.image} />
                            <p onClick={() => viewProfile(comment.userId, commentPage)} className="imageText"><a href="">{comment.username}</a></p>
                            <p className="status">{comment.status}</p>
                        </div>
                        <div className="currContentTwo">


                            <p>{comment.detail}</p>
                            <Button onClick={() => commentPage.openReplyForm(comment._id)} variant="contained" color="secondary">
                                Reply
                            </Button>

                        </div>
                    </div>
                    {comment.responses.length === 0 ?
                        null
                        : <ul>{ // recursively go through to add a response
                            nestedCommentsHandler(comment.responses, commentPage)}</ul>}</li>)
        })

    );
}


export const submitReply = (commentPage) => {
    const { reply, commentId } = commentPage.state
    if (reply === '') {
        return
    }
    const userId = localStorage.getItem("id")
    const postId = commentPage.props.match.params.id
    const body = { userId, detail: reply }

    const request = new Request(`${API_HOST_URL}/users/posts/reply/${postId}/${commentId}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json()

            }
        })
        .then(async json => {
            if (json) {
                getPostAndComments(commentPage, postId)



            }
        })

        .catch(error => {
            console.log(error);
        });

    commentPage.closeAll()
}


export const viewProfile = (id, commentPage) => {
    commentPage.props.history.push(`/profile/${id}`)
}




