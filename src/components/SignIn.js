import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import './components-styles/SignIn.css'

export default class SignIn extends React.Component {
    render(){
        const signIn = (event) => {
            event.preventDefault();
            this.props.auth
            .signInWithEmailAndPassword(this.props.email, this.props.password)
            .catch((error) => alert(error.message));
            //close modal
            this.props.setOpenSignIn(false);
          }
        return (
            <Modal
            open={this.props.openSignIn}
            onClose={() => this.props.setOpenSignIn(false)}
        >
            <div style={this.props.modalStyle} className={this.props.classes.paper}>
            <form className="app__signUp">
                <center>
                <img
                    className="app__headerImage"
                    src="/../images/instagram-header.svg"
                    alt=""
                />
                </center>
                <Input 
                placeholder="email"
                type="text"
                value={this.props.email}
                onChange={(e) => this.props.setEmail(e.target.value)}
                />
                <Input 
                placeholder="password"
                type="password"
                value={this.props.password}
                onChange={(e) => this.props.setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signIn}> Sign In </Button>
            </form>
            </div>
        </Modal>
        )
    }
}