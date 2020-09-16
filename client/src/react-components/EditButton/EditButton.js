import React from "react";

class EditButton extends React.Component {
    render() {
        const { id, actualUser, name, onClick, className } = this.props


        return (
            <div>
                {actualUser ?
                    <img alt="edit" id={id} name={name} onClick={onClick} className={className} src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} />
                    : null
                }


            </div>


        );
    }
}


export default EditButton;