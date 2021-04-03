import * as React from 'react';
import InstagramEmbed from 'react-instagram-embed';
import './components-styles/SignUp.css'

export default class PostRight extends React.Component {
    render(){
        return (   
        <div className="app__postsRight">
            <InstagramEmbed
            className="floating"
            url="https://www.instagram.com/p/CNIUkMNsSBE/?utm_source=ig_web_copy_link"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
            />
        </div>
        )
    }
}