/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user");
const { Post } = require("./models/posts");
const date = require('date-and-time')

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);



app.post("/users/registration", (req, res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        image: "https://res.cloudinary.com/dzuvioe6w/image/upload/v1597279271/nri7mjuk/xushpnkikvrmkhry5gic.png"




    });


    user.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error);
        }
    );
});


app.get("/users", (req, res) => {



    User.find().then((user) => {
        res.send(user)
    })
        .catch((error) => {
            log(error)
            res.status(500).send("Internal Server Error")
        })

});



app.post("/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;



    User.findByEmailPassword(username, password)
        .then(user => {
            req.session.user = user._id;


            res.send({ currentUser: user._id, status: user.status });
        })
        .catch(error => {
            res.status(400).send()
        });
});


app.get("/users/profile/:id", (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return
    }


    User.findById(id).then((profile) => {
        if (!profile) {
            res.status(404).send('Resource not found')
        } else {
            res.send(profile)
        }
    })
        .catch((error) => {
            log(error)
            res.status(500).send('Internal Server Error')
        })

});



app.patch("/users/profile/:id", async (req, res) => {
    const id = req.params.id


    const body = req.body
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return
    }

    User.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(profile => {
            if (!profile) {
                res.status(404).send();
            } else {
                res.send(profile);
            }
        })
        .catch(error => {
            res.status(400).send(error);
        });

});


app.delete("/users/profile/:id", (req, res) => {
    const id = req.params.id;


    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }



    User.findByIdAndRemove(id)
        .then(async profile => {
            if (!profile) {
                res.status(404).send();
            } else {
                await Post.deleteMany({ author: id })
                res.send(profile);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});


app.get("/users/check-session", (req, res) => {
    if (req.session.user) {

        res.send({ currentUser: req.session.user });
    } else {
        res.status(401).send();

    }
});


app.get("/users/logout", (req, res) => {

    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});



// POSTS


app.post("/users/posts", (req, res) => {



    const pattern = date.compile('MMM D YYYY');

    if (!ObjectID.isValid(req.body.author)) {
        res.status(404).send()
        return
    }

    const post = new Post({
        author: req.body.author,
        title: req.body.title,
        location: req.body.location,
        date: req.body.date,
        peopleNeeded: req.body.peopleNeeded,
        description: req.body.description,
        time: req.body.time,
        resolved: false,
        comments: [],
        creationDate: date.format(new Date(), pattern)

    });


    post.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error);
        }
    );
});


// insert a comment given postid
app.post("/users/posts/:id", (req, res) => {


    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return
    }

    if (!ObjectID.isValid(req.body.userId)) {
        res.status(404).send()
        return
    }

    const comment = {
        userId: req.body.userId,
        detail: req.body.detail,

    }

    Post.findById(id).then((async post => {
        if (!post) {
            res.status(404).send('Resource not found')
        } else {


            post.comments.push(comment)
            post.save()

            res.send({
                comment,
                post
            })
        }
    }))
        .catch((error) => {
            log(error)
            res.status(500).send('Internal Server Error')
        })
});

// gets post given post Id
app.get("/users/posts/:id", (req, res) => {


    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return
    }

    Post.findById(id).then((async post => {
        if (!post) {
            res.status(404).send('Resource not found')
        } else {

            const user = await User.findById(post.author)
            if (user !== null) {
                post.username = user.username
                post.status = user.status
                post.image = user.image

            } else {
                post.username = "deleted user"
                post.status = "deleted user"
                post.image = "https://res.cloudinary.com/dzuvioe6w/image/upload/v1597279271/nri7mjuk/xushpnkikvrmkhry5gic.png"
            }





            const stack = []
            let found = false
            stack.push(post.comments)


            for (var responses of stack) {
                for (var comment of responses) {
                    const comUser = await User.findById(comment.userId)
                    if (comUser === null) {
                        comment.username = "deleted user"
                        comment.status = "deleted user"
                        comment.image = "https://res.cloudinary.com/dzuvioe6w/image/upload/v1597279271/nri7mjuk/xushpnkikvrmkhry5gic.png"
                    } else {
                        comment.username = comUser.username
                        comment.status = comUser.status
                        comment.image = comUser.image
                    }
                    if (comment.responses.length !== 0) {
                        stack.push(comment.responses)
                    }
                }
            }








            res.send(
                post
            )
        }
    }))
        .catch((error) => {
            log(error)
            res.status(500).send('Internal Server Error')  // server error
        })
});





app.get("/users/posts", (req, res) => {


    Post.find({}).then((async posts => {
        if (!posts) {
            res.status(404).send('Resource not found')
        } else {

            for (const post of posts) {
                const user = await User.findById(post.author)
                post.username = user.username
                post.status = user.status
                post.image = user.image
            }


            res.send(
                posts
            )
        }
    }))
        .catch((error) => {
            log(error)
            res.status(500).send('Internal Server Error')  // server error
        })
});



app.get("/users/posts/user/:userId", (req, res) => {
    const userId = req.params.userId

    if (!ObjectID.isValid(userId)) {
        res.status(404).send()
        return
    }

    Post.find({ author: userId }).then((async posts => {
        if (!posts) {
            res.status(404).send('Resource not found')
        } else {

            for (const post of posts) {
                const user = await User.findById(post.author)
                post.username = user.username
                post.status = user.status
                post.image = user.image
            }


            res.send(
                posts
            )
        }
    }))
        .catch((error) => {
            log(error)
            res.status(500).send('Internal Server Error')  // server error
        })
});



app.patch("/users/posts/:id", async (req, res) => {
    const id = req.params.id


    const body = req.body
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return
    }

    Post.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(post => {
            if (!post) {
                res.status(404).send();
            } else {
                res.send(post);
            }
        })
        .catch(error => {
            res.status(400).send(error);
        });

});


app.delete("/users/posts/:id", (req, res) => {
    const id = req.params.id;


    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }



    Post.findByIdAndRemove(id)
        .then(post => {
            if (!post) {
                res.status(404).send();
            } else {
                res.send(post);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.post("/users/posts/reply/:id/:commentId", async (req, res) => {


    const postId = req.params.id
    const commentId = req.params.commentId

    if (!ObjectID.isValid(postId)) {
        res.status(404).send()
        return
    }

    if (!ObjectID.isValid(commentId)) {
        res.status(404).send()
        return
    }

    const newComment = {
        userId: req.body.userId,
        detail: req.body.detail,
        responses: []
    }



    Post.findById(postId).then((post => {
        if (!post) {
            res.status(404).send('Resource not found')
        } else {
            // BFS algorithm
            const stack = []
            let found = false
            stack.push(post.comments)
            while (found === false) {
                if (found === true) {
                    break
                }

                for (var responses of stack) {
                    if (found === true) {
                        break
                    }



                    for (var comment of responses) {


                        if (comment._id == commentId) {
                            found = true
                            comment.responses.push(newComment)
                            break
                        }
                        if (comment.responses.length !== 0) {
                            stack.push(comment.responses)
                        }
                    }
                }
                break
            }


            if (found === false) {
                res.status(404).send("Not Found")
            } else {
                post.save()
                res.send(post)
            }





        }
    }))
        .catch((error) => {
            log(error)
            res.status(500).send('Internal Server Error')  // server error
        })
});






/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/profile", "/getHelp", "/myPosts", "/help", "/comments", "/admin", "/signup"];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(__dirname + "/client/build/index.html");
});






/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
