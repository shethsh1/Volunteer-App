import React from "react";
import { Button } from '@material-ui/core';

class CommentCreateForm extends React.Component {




    render() {
        const { comment, createComment, errorMessage } = this.props





        return (
            <div>
                <h1>Comment</h1>

                <textarea onChange={comment.handleChange} name="detail" value={comment.state.detail} className="commentForm" placeholder="Share your thoughts..." maxLength="1000"></textarea>
                <Button onClick={() => createComment(comment)} className="commentButton" variant="contained" color="primary">Create Comment</Button>
                <span className="errorMessageComment">{errorMessage}</span>
            </div>








        );
    }
}

export default CommentCreateForm;