const API_HOST_URL = "" // http://localhost:5000 

export const readCookie = (app) => {
    const url = `${API_HOST_URL}/users/check-session`;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};



export const handleLogin = (account, app) => {

    /*
    A database call should be made here to first get a list of user then check whether
    the username and password is matched
    */
    const loginDetails = { username: account.state.username, password: account.state.password }
    const request = new Request(`${API_HOST_URL}/users/login`, {
        method: "post",
        body: JSON.stringify(loginDetails),
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



            } else {
                account.setState({
                    errorMessage: "incorrect password / username"
                })


            }
        })
        .then(json => {
            if (json !== undefined) {
                localStorage.setItem("id", json.currentUser)
                localStorage.setItem("status", json.status)

                app.setState({ currentUser: json.currentUser });
                account.props.history.push(`/profile/${json.currentUser}`);
            }

        })

        .catch(error => {
            console.log(error);
        });





}






export const handleRegistration = (account) => {
    /*
    A database base call should be made here to find out if the username isn't already taken
    */
    const { firstName, lastName, username, email, password, confirmPassword, age, gender, status } = account.state
    if (firstName !== '' && lastName !== '' && username !== '' && email !== '' && password !== '' && confirmPassword !== '' && age !== '' && gender !== '' && status != '') {
        if (password !== confirmPassword) {
            account.setState({
                errorMessage: "Passwords do not match",
                successMessage: ""
            })
            return
        }
        if (password.length <= 3) {
            account.setState({
                errorMessage: "Passwords must be at least 4 characters",
                successMessage: ""
            })
            return
        }
        /*
        A database call should be made here to insert an account into the database

        */


        const loginComp = { firstName, lastName, username, email, password, confirmPassword, status, age, gender }
        const request = new Request(`${API_HOST_URL}/users/registration`, {
            method: "post",
            body: JSON.stringify(loginComp),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });

        // Send the request with fetch()
        fetch(request)
            .then(res => {
                if (res.status === 200) {
                    account.setState({
                        errorMessage: '',
                        successMessage: "Successfully created",
                        firstName: '',
                        lastName: '',
                        username: '',
                        email: '',
                        password: '',
                        age: '',
                        gender: '',
                        status: '',
                        confirmPassword: '',

                    })


                }
                if (res.status === 400) {
                    return res.json()

                }
            })
            .then(json => {
                if (json) {
                    if (json.keyValue) {
                        if (json.keyValue.email) {
                            account.setState({
                                errorMessage: "Email is already taken please choose another",
                                successMessage: ""
                            })
                        } else if (json.keyValue.username) {
                            account.setState({
                                errorMessage: "Username is already taken please choose another",
                                successMessage: ""
                            })
                        }
                    }
                    if (json.errors) {
                        account.setState({
                            errorMessage: "Format invalid",
                            successMessage: ""
                        })
                    }
                }
            })

            .catch(error => {
                console.log(error);
            });








    } else {
        account.setState({
            errorMessage: "Please fill out every field",
            successMessage: ""
        })
    }


}