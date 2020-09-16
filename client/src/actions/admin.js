const API_HOST_URL = "" // http://localhost:5000 
export const getAccounts = async (admin) => {

    const url = `${API_HOST_URL}/users`;

    await fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                admin.setState({ users: json })
            }

        })
        .catch(error => {
            console.log(error);
        });
}


export const getUpdateForm = (key, admin) => {





    const url = `${API_HOST_URL}/users/profile/${key}`;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                admin.setState({
                    "username": json['username'],
                    "status": json['status'],
                    "firstName": json['firstName'],
                    "lastName": json['lastName'],
                    "age": json['age'],
                    "gender": json['gender'],
                    "email": json['email'],
                    "id": json['_id'],
                    "activateUpdateForm": true,
                    "activateCreateForm": false,
                    open: true

                })


            }

        })
        .catch(error => {
            console.log(error);
        });







}


export const addAccountToState = (admin) => {

    const { username, status, firstName, lastName, age, gender, email, password, confirmPassword } = admin.state
    if (lastName === '' || username === '' || status === '' || firstName === '' || age === '' || gender === '' || email === '' || password === '' || confirmPassword === '') {
        admin.setState({
            errorMessage: "please fill out every field"
        })
        return
    }
    if (password !== confirmPassword) {
        admin.setState({
            errorMessage: "password's don't match"
        })
        return
    }
    if (password.length <= 3) {
        admin.setState({
            errorMessage: "password length must be at least 4 characters"
        })
        return
    }

    /*
        A database call should be here to see if the username isn't already taken
    */
    const details = { firstName, lastName, username, email, password, confirmPassword, status, age }
    const request = new Request(`${API_HOST_URL}/users/registration`, {
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
                admin.close()
                getAccounts(admin)



            }
            if (res.status === 400) {
                return res.json()

            }
        })
        .then(json => {
            if (json) {
                if (json.keyValue) {
                    if (json.keyValue.email) {
                        admin.setState({
                            errorMessage: "Email is already taken please choose another",
                        })
                    } else if (json.keyValue.username) {
                        admin.setState({
                            errorMessage: "Username is already taken please choose another",
                        })
                    }
                }
                if (json.errors) {
                    admin.setState({
                        errorMessage: "Format invalid",
                    })
                }
            }
        })

        .catch(error => {
            console.log(error);
        });


}


export const updateAccount = (admin) => {
    /*
    A database call should be made here to retrieve the user with this specific id
    */



    /*
    if found, a database call should be made here to update its properties
    */

    const changer = {
        username: admin.state.username,
        firstName: admin.state.firstName,
        lastName: admin.state.lastName,
        age: admin.state.age,
        gender: admin.state.gender,
        email: admin.state.email,
        status: admin.state.status
    }

    if (admin.state.id === localStorage.getItem("id")) {
        changer.status = "Admin"
        alert("This is your account so the status is defaulted to Admin-Always")
    }

    const request = new Request(`${API_HOST_URL}/users/profile/${admin.state.id}`, {
        method: "PATCH",
        body: JSON.stringify(changer),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                admin.close()
                getAccounts(admin)


            } else if (res.status === 400) {
                return res.json()
            }

        })
        .then(json => {
            if (json) {
                if (json.keyValue) {
                    if (json.keyValue.email) {
                        admin.setState({
                            errorMessage: "Email is already taken please choose another",
                        })
                    } else if (json.keyValue.username) {
                        admin.setState({
                            errorMessage: "Username is already taken please choose another",
                        })
                    }
                }
            }
        })









}


export const addAccount = (admin) => {
    admin.close()
    admin.setState({
        "activateCreateForm": true,
        open: true
    })
    admin.props.history.push("/admin/#updateForm")

}


export const deleteT = (key, admin, status) => {
    admin.close()
    if (key === localStorage.getItem("id")) {
        alert("Unable to delete your account")
        return
    }
    /*
    A database call should be here to see if the username isn't already taken
*/
    const request = new Request(`${API_HOST_URL}/users/profile/${key}`, {
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
                getAccounts(admin)



            }
        })


        .catch(error => {
            console.log(error);
        });



}

export const checkProfile = (key, admin) => {
    admin.props.history.push("/profile/" + key)
}

export const viewAllPost = (admin) => {
    admin.props.history.push("/myPosts")
}