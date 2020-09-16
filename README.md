# Team 25
<h1 align="center">website description</h1>

Deployed website: https://protected-everglades-78341.herokuapp.com/

The purpose of our project is to provide a service for people affected by COVID-19 or other viruses
needing quarantine. Our main target population are vulnerable people. Our application serves as a
platform for those in social isolation to be able to ask for help with essentials such as groceries, food and
medical supplies. The way our platform works is by having two separate parties, volunteers and
consumers. Volunteers are able to sign up with our service with a sole reason to help people in need.
People in need will also be able to sign up and make posts about help that they need with details about
location, time and the kind of help required. This relates to the themes of public health and community
response because it’s preventing disease to those that are possibly in self-quarantine and can’t leave
their homes by giving a free service for other volunteers to assist them. 

**TA note: Everything from the proposal was finished except two very minor details that I don't know if it's even worth mentioning, but we chose to not include the name of the app in the top left and profile pages don't have an edit biography. The biography kinda looked cluttered and unneeded, and we never decided on a name for this app so thats why that was excluded**

<h1 align="center">Table of Contents</h1>

[**User Types**](#instructions)

1. [User](#user)
2. [Volunteer](#volunteer)
3. [Admin](#admin)

[**Routes Overview**](#Routes-Overview)

1. [Post Routes](#Post-Routes)
2. [Get Routes](#Get-Routes)
3. [Patch Routes](#Patch-Routes)
4. [Delete Routes](#Delete-Routes)

[**How to Run**](#how-to-run)

1. [How To Run](#how-to-run)

<h1 align="center">instructions</h1>

## User

**Everything is stored in a database so everything will remain consistent throughout the app**

### Account details: 
* username: `user`
* password: `user`

### Regular User Features

* To use any feature you must be logged in!!
* **Profile Page**
    * Upon logging you can click on "Profile" to see your profile page. This page features is the same for all users.
    * The profile page consist of your username, first name, last name, status, gender, location, ... most of which you can customize by clicking on the pencil then reclicking after you're finished
    * additionally users can view other users profile pages by clicking on their name in a post or a comment.
    * also you can click on the "View My Post" button in the profile page to see your post.

  
* **Need Help? Page**
    * Users can go to this page by clicking on it through the navigation bar
    * Users fill out a form with "Title", "description", "time", and other details to make a post on the help you need.
    * Once submitted you will be then redirected to the comment page with your post
    * You can view the post by going to "view my post" along with all your other on the navigation bar or in the profile page. 

* **Your post page** 
    * You can search by title of all your post
    * You can hide all your unresolved or resolved post
    * You can search by time you picked and date
    * along with many other categories
    * You can also delete your posts

    
* **Commenting on your post**
    * You can click on view on your post then you may comment on it.
    * This is where regular users can interact with volunteers / admins
    * You can also reply to each comment by clicking reply

* After you're done you can logout by clicking logout on the navigation bar

[back to top](#table-of-contents)

## Volunteer

### Account details: 
* username: `user2`
* password: `user2`

### Volunteer Features
* To use any feature you must be logged in!!
* **Profile Page**
    * Upon logging you can click on "Profile" to see your profile page. This page features is the same for all users.
    * The profile page consist of your username, first name, last name, status, gender, ... most of which you can customize by clicking on the pencil then reclicking after you're finished

    * additionally users can view other users profile pages by clicking on their name in a post or a comment.
    * also you can click on the "View All Post" button in the profile page to all the post created and if you can help

  
* **Looking to Help? Page**
    * This is the page where you can view post created by regular users
    * You can search by title of all your post
    * You can hide all your unresolved or resolved post
    * You can search by time you picked and date
    * You can search by author of post
    * You are also able to set post as resolved or unresolved 
    
* **Commenting on a user post**
    * Upon clicking view on a post you can comment and interact with regular users to see if you can help
    * After you're done you can logout by clicking logout on the navigation bar
    * You can also reply to each comment by clicking reply

[back to top](#table-of-contents)

## Admin

### Account details: 
* username: `admin`
* password: `admin`


**(I recommend you test admin features last as deleting accounts would quickly get rid of the mock data)**

### Admin Features

* To use any feature you must be logged in!!
* Admin's can do everything volunteers can do + more
* **Profile Page**
    * Upon logging you can click on "Profile" to see your profile page. This page features is the same for all users.
    * The profile page consist of your username, first name, last name, status, gender, ... most of which you can customize by clicking on the pencil then reclicking after you're finished

    * additionally users can view other users profile pages by clicking on their name in a post or a comment. 
    * also you can click on the "View All Post" button in the profile page to all the post created and if you can help

  
  
* **Admin Panel**
    * You can get to this by clicking on it through the navigation bar
    * You can update account details of any user! 
    * You can also create accounts by filling out the form
    * You can also delete accounts 
    * Wont let you delete your own account
    * Wont let you make yourself not an admin
    * You can also delete post 
    


[back to top](#table-of-contents)


<h1 align="center">How to Run</h1>

* download git bash if you don't have it
* `git clone` the repo
*  run `npm install` on the main folder and client
*  run `npm run build` in the client folder
* navigate back to the main folder and run `node server.js` (ASSUMING mongo server is running)
* now go to http://localhost:5000 and you should be at the login page

[back to top](#table-of-contents)

<h1 align="center">Routes Overview</h1>

## Post Routes

* http://localhost:5000/users/registration
    * given account info will add an account into the database
    * Request Body expects (with same data type as example below):
    * Status must either be Admin, Volunteer, or User. This was not checked.
    ```javascript
   {
       "username": "test1",
       "password": "test1",
       "status": "Admin",
       "firstName": "Shaahid",
       "lastName": "Sheth",
       "email": "Shaahid@gmail.com",
       "age": 20,
       "gender": "Male"
   }
    ```
   * Returned JSON should be the database document added (with passwords hashed and image set to default).
   ```javascript
   {
       "_id": "5f3773683cbb6d40042e19fa",
       "username": "test1",
       "password": "$2a$10$gIlgRQCD0L6go2k18vx0auQwq94HmoSJqUDiagd4UFU7ypCXUFHy.",
       "status": "Admin",
       "firstName": "Shaahid",
       "lastName": "Sheth",
       "email": "Shaahid@gmail.com",
       "age": 20,
       "gender": "Male",
       "image": "https://res.cloudinary.com/dzuvioe6w/image/upload/v1597279271/nri7mjuk/xushpnkikvrmkhry5gic.png",
       "__v": 0
   }
   
   ```
   
[back to top](#table-of-contents)
   
* http://localhost:5000/users/login
    * Given username and password returns currentUser id and status and sets cookie, if fails sends 401 status response
    * Request body expects:
    ```javascript
   {
       "username": "test1",
       "password": "test1"
   }
    ```
   * Returned JSON should be the userId and status of given user
   ```javascript
   {
       "currentUser": "5f3773683cbb6d40042e19fa",
       "status": "Admin"
   }
   ```
   
[back to top](#table-of-contents)
   
* http://localhost:5000/users/posts
    * Given post details returns json of post database document created
    * Request body expects (NOTE: author is the userId)
    ```javascript
   {
       "_id": "5f377a379a855640ec9c7342",
       "author": "5f3773683cbb6d40042e19fa",
       "title": "Need help with medicine",
       "location": "Scarborough",
       "date": "8/15/2020",
       "peopleNeeded": 6,
       "description": "a description",
       "time": "18:00",
       "resolved": false,
       "comments": [],
       "creationDate": "Aug 15 2020",
       "__v": 0
   }
    
    ```
    * Returned JSON should be the database document added.
    ```javascript
   {
       "_id": "5f377a379a855640ec9c7342",
       "author": "5f3773683cbb6d40042e19fa",
       "title": "Need help with medicine",
       "location": "Scarborough",
       "date": "8/15/2020",
       "peopleNeeded": 6,
       "description": "a description",
       "time": "18:00",
       "resolved": false,
       "comments": [],
       "creationDate": "Aug 15 2020",
       "__v": 0
   }
    ```
    
[back to top](#table-of-contents)

 * http://localhost:5000/users/posts/:id
     * Given postId you can write a comment to a post
     * Request Body expects - (url has params "id" that refers to postId )
     * http://localhost:5000/users/posts/5f377a379a855640ec9c7342
    ```javascript
   {
       "userId": "5f3773683cbb6d40042e19fa",
       "detail": "insert a comment here"
   }
    ```
    * Returned JSON should be the comment document added to the database and the comment.
    ```javascript
   {
       "comment": {
           "userId": "5f3773683cbb6d40042e19fa",
           "detail": "insert a comment here"
       },
       "post": {
           "_id": "5f377a379a855640ec9c7342",
           "author": "5f3773683cbb6d40042e19fa",
           "title": "Need help with medicine",
           "location": "Scarborough",
           "date": "8/15/2020",
           "peopleNeeded": 6,
           "description": "a description",
           "time": "18:00",
           "resolved": false,
           "comments": [
               {
                   "_id": "5f377b9b9a855640ec9c7343",
                   "userId": "5f3773683cbb6d40042e19fa",
                   "detail": "insert a comment here",
                   "responses": []
               }
           ],
           "creationDate": "Aug 15 2020",
           "__v": 0
       }
   }
    ```
    
[back to top](#table-of-contents)

* http://localhost:5000/users/posts/reply/:id/:commentId
    * Given comment id and post id return a reply to a specific comment
    * using the above comment http://localhost:5000/users/posts/reply/5f377a379a855640ec9c7342/5f377b9b9a855640ec9c7343
    * Request body expects (author is the userId):
    ```javascript
   {
       "userId": "5f3773683cbb6d40042e19fa",
       "detail": "child comment"
   }
    ```
   * Returned JSON should be the nested post tree that we saw before but now with a response to a comment
   ```javascript
   {
       "_id": "5f377a379a855640ec9c7342",
       "author": "5f3773683cbb6d40042e19fa",
       "title": "Need help with medicine",
       "location": "Scarborough",
       "date": "8/15/2020",
       "peopleNeeded": 6,
       "description": "a description",
       "time": "18:00",
       "resolved": false,
       "comments": [
           {
               "responses": [
                   {
                       "_id": "5f377cd99a855640ec9c7344",
                       "userId": "5f3773683cbb6d40042e19fa",
                       "detail": "child comment",
                       "responses": []
                   }
               ],
               "_id": "5f377b9b9a855640ec9c7343",
               "userId": "5f3773683cbb6d40042e19fa",
               "detail": "insert a comment here"
           }
       ],
       "creationDate": "Aug 15 2020",
       "__v": 1
   }
   ```
    
[back to top](#table-of-contents)

## Get Routes
   
* http://localhost:5000/users
    * Returns a list of users
    ```javascript
    [{
        "_id": "5f3773683cbb6d40042e19fa",
        "username": "test1",
        "password": "$2a$10$gIlgRQCD0L6go2k18vx0auQwq94HmoSJqUDiagd4UFU7ypCXUFHy.",
        "status": "Admin",
        "firstName": "Shaahid",
        "lastName": "Sheth",
        "email": "Shaahid@gmail.com",
        "age": 20,
        "gender": "Male",
        "image": "https://res.cloudinary.com/dzuvioe6w/image/upload/v1597279271/nri7mjuk/xushpnkikvrmkhry5gic.png",
        "__v": 0
    }]
    ```
    
[back to top](#table-of-contents)

* http://localhost:5000/users/profile/:id
    * given userId in url returns a json document of the user
    * e.g. http://localhost:5000/users/profile/5f3773683cbb6d40042e19fa
    ```javascript
   {
       "_id": "5f3773683cbb6d40042e19fa",
       "username": "test1",
       "password": "$2a$10$gIlgRQCD0L6go2k18vx0auQwq94HmoSJqUDiagd4UFU7ypCXUFHy.",
       "status": "Admin",
       "firstName": "Shaahid",
       "lastName": "Sheth",
       "email": "Shaahid@gmail.com",
       "age": 20,
       "gender": "Male",
       "image": "https://res.cloudinary.com/dzuvioe6w/image/upload/v1597279271/nri7mjuk/xushpnkikvrmkhry5gic.png",
       "__v": 0
   }
    ```
    
[back to top](#table-of-contents)

* http://localhost:5000/users/check-session
    * Sees if there is a session cookie currently saved
    * if yes returns the current user else status 401
    ```javascript
   {
       "currentUser": "5f3773683cbb6d40042e19fa"
   }
    ```
    
[back to top](#table-of-contents)
    
* http://localhost:5000/users/logout
    * destroys the current active session
    * sends 500 status if error otherwise sends nothing but 200
    
* http://localhost:5000/users/posts/:id
    * given post id returns a json document of a post and all its comments. Also adds usernames images and other info to each comment
    * e.g. http://localhost:5000/users/posts/5f377a379a855640ec9c7342
    ```javascript
   {
       "_id": "5f377a379a855640ec9c7342",
       "author": "5f3773683cbb6d40042e19fa",
       "title": "Need help with medicine",
       "location": "Scarborough",
       "date": "8/15/2020",
       "peopleNeeded": 6,
       "description": "a description",
       "time": "18:00",
       "resolved": false,
       "comments": [
           {
               "responses": [
                   {
                       "responses": [],
                       "_id": "5f377cd99a855640ec9c7344",
                       "userId": "5f3773683cbb6d40042e19fa",
                       "detail": "child comment"
                   }
               ],
               "_id": "5f377b9b9a855640ec9c7343",
               "userId": "5f3773683cbb6d40042e19fa",
               "detail": "insert a comment here",
               "username": "test1",
               "status": "Admin",
               "image": "https://res.cloudinary.com/dzuvioe6w/image/upload/v1597279271/nri7mjuk/xushpnkikvrmkhry5gic.png"
           }
       ],
       "creationDate": "Aug 15 2020",
       "__v": 2,
       "username": "test1",
       "status": "Admin",
       "image": "https://res.cloudinary.com/dzuvioe6w/image/upload/v1597279271/nri7mjuk/xushpnkikvrmkhry5gic.png"
   }
    ```
    
[back to top](#table-of-contents)
    
 * http://localhost:5000/users/posts
     * this is like the above but it gets every post and in a list. So it returns a list of json documents of all post

 * http://localhost:5000/users/posts/user/:userId
     * similar to above but it returns all the post that has the given param user Id
     
# Patch Routes

* http://localhost:5000/users/profile/:id
    * given userId and request body with user elements you can edit them and it will return the editted json document
    * For example, 5f3773683cbb6d40042e19fa Request body:
    ```javascript
   {
       "age": 21
   }
    ```
   * Returns the users updated json document
   ```javascript
   {
       "_id": "5f3773683cbb6d40042e19fa",
       "username": "test1",
       "password": "$2a$10$gIlgRQCD0L6go2k18vx0auQwq94HmoSJqUDiagd4UFU7ypCXUFHy.",
       "status": "Admin",
       "firstName": "Shaahid",
       "lastName": "Sheth",
       "email": "Shaahid@gmail.com",
       "age": 21,
       "gender": "Male",
       "image": "https://res.cloudinary.com/dzuvioe6w/image/upload/v1597279271/nri7mjuk/xushpnkikvrmkhry5gic.png",
       "__v": 0
   }
   ```
   
[back to top](#table-of-contents)
    
* http://localhost:5000/users/posts/:id 
    * Given post id and a request body of the part of the post you want to edit, it will then return the updated post
    * e.g. http://localhost:5000/users/posts/5f377a379a855640ec9c7342 and requestbody:
    ```javascript
   {
       "resolved": true
   }
    ```
   * returned updated json document of the post
   ```javascript
   {
       "_id": "5f377a379a855640ec9c7342",
       "author": "5f3773683cbb6d40042e19fa",
       "title": "Need help with medicine",
       "location": "Scarborough",
       "date": "8/15/2020",
       "peopleNeeded": 6,
       "description": "a description",
       "time": "18:00",
       "resolved": true,
       "comments": [...],
       "creationDate": "Aug 15 2020",
       "__v": 2
   }
   ```
   
[back to top](#table-of-contents)

# Delete Routes

* http://localhost:5000/users/profile/:id
  * given user id removes the user from the database and returns the removed user and if user not found returns 404 error additionally removes all the posts of the user. 404 if not found
  * e.g. http://localhost:5000/users/profile/5f3773683cbb6d40042e19fa
  * returns
  ```javascript
   {
       "_id": "5f3773683cbb6d40042e19fa",
       "username": "test1",
       "password": "$2a$10$gIlgRQCD0L6go2k18vx0auQwq94HmoSJqUDiagd4UFU7ypCXUFHy.",
       "status": "Admin",
       "firstName": "Shaahid",
       "lastName": "Sheth",
       "email": "Shaahid@gmail.com",
       "age": 21,
       "gender": "Male",
       "image": "https://res.cloudinary.com/dzuvioe6w/image/upload/v1597279271/nri7mjuk/xushpnkikvrmkhry5gic.png",
       "__v": 0
   }
  ```
        
* http://localhost:5000/users/posts/:id
    * give post id removes the post and returns it. if post not found returns 404 id. 
    * very similar to the one above but for post

[back to top](#table-of-contents)
    
