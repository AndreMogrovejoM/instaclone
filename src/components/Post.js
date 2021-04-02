import React from 'react';
import './components-styles/Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({username, caption, imgUrl}) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                className="post__avatar"
                alt='Nino'
                src="/../../images/nina.jpeg"
                />
                <h3 className="post__username">{username}</h3>
            </div>
            
            
            <img className="post__image" src={imgUrl} alt=""/>

            <h4 className="post__text"><strong>{username}:</strong> {caption}</h4>
        </div>
    )
}

export default Post
