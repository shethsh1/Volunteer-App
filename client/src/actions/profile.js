
const API_HOST_URL = "" // http://localhost:5000 

export const changeProfile = (event, profile) => {
    /*
        A database call should be made here to change image given user id
    */
    const name = event.target.name
    const formName = event.target.id



    const changer = { [name]: profile.state[name] }

    const request = new Request(`${API_HOST_URL}/users/profile/${localStorage.getItem("id")}`, {
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
                profile.setState({
                    [formName]: false
                })



            }

        })



};



export const uploadImage = async (event, profile) => {
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'nri7mjuk')



    const request = new Request(`https://api.cloudinary.com/v1_1/dzuvioe6w/image/upload`, {
        method: "post",
        body: data


    });

    // Send the request with fetch()
    fetch(request)
        .then((response) => {
            return response.json()

        })
        .then(json => {
            const url = json.secure_url

            const changer = { image: url }

            const request = new Request(`${API_HOST_URL}/users/profile/${localStorage.getItem("id")}`, {
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
                        profile.setState({
                            image: url
                        })



                    }

                })


        })



        .catch(error => {
            console.log(error);
        });
};

export const getProfileInformation = async (profile, id) => {
    const url = `${API_HOST_URL}/users/profile/${id}`;

    await fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                const { firstName, lastName, username, status, age, gender, image, location } = json
                profile.setState({ ...profile.state, firstName, lastName, username, status, age, gender, image, location })

            }

        })
        .catch(error => {
            console.log(error);
        });

}

export const getMyInfo = async (profile, id) => {
    const url = `${API_HOST_URL}/users/profile/${id}`;

    await fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                profile.setState({ currStatus: json.status })


            }

        })
        .catch(error => {
            console.log(error);
        });
}