

const API_HOST_URL = "" // http://localhost:5000 

export const handleHelpForm = (posts) => {



    const { title, location, date, peopleNeeded, description, time } = posts.state
    const today = new Date()
    const checkDate = Date.parse(date)
    if (today > checkDate) {
        posts.setState({
            message: "This date is from the past only present dates please"
        })
        document.querySelector(".messageForm").style.color = "red"
        return
    }

    if (title === '' || location === '' || date === '' || peopleNeeded === '' || description === '' || time === '') {
        posts.setState({
            message: "please fill out every field"
        })
        document.querySelector(".messageForm").style.color = "red"
        return
    }




    const details = { title, location, date, peopleNeeded, description, time, author: localStorage.getItem("id") }
    const request = new Request(`${API_HOST_URL}/users/posts`, {
        method: "post",
        body: JSON.stringify(details),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                posts.clear()
                return res.json()

            }
        })
        .then(json => {
            if (json) {

                posts.props.history.push(`/comments/${json._id}`)

            }
        })

        .catch(error => {
            console.log(error);
        });


}


export const viewProfile = (id, posts) => {
    posts.props.history.push("/profile/" + id)
}

export const viewPost = (id, posts) => {
    posts.props.history.push("/comments/" + id)
}

export const deletePost = (post, postPage) => {
    /*
        A database call should be made here to delete a post given id
    */




    const request = new Request(`${API_HOST_URL}/users/posts/${post._id}`, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                const newPosts = postPage.state.posts.filter(currPost => currPost._id !== post._id)
                postPage.setState({ posts: newPosts })

            }
        })
        .then(json => {
            if (json) {

            }
        })

        .catch(error => {
            console.log(error);
        });
}

export const getMyInfo = async (posts, id) => {
    const url = `${API_HOST_URL}/users/profile/${id}`;

    await fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                posts.setState({ status: json.status })


            }

        })
        .catch(error => {
            console.log(error);
        });
}

export const getPosts = async (post, status) => {
    let url = ""
    if (status === "User") {
        url = `${API_HOST_URL}/users/posts/user/${localStorage.getItem("id")}`;
    } else {
        url = `${API_HOST_URL}/users/posts`;
    }



    await fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                post.setState({ posts: json })



            }

        })
        .catch(error => {
            console.log(error);
        });
}





export const toggleResolve = async (post, postPage, status) => {

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
                const newPost = postPage.state.posts.map((currPost) => {
                    if (currPost._id == post._id) {
                        post.resolved = !post.resolved
                        return post
                    } else {
                        return post
                    }
                })
                postPage.setState({ post: newPost })








            }
        })

        .catch(error => {
            console.log(error);
        });


}