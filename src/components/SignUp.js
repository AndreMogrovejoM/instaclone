import React, {useState, useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import './components-styles/SignUp.css'

import { makeStyles } from '@material-ui/core/styles';


export default class SignUp extends React.Component {
    render(){
        const signUp = (event) => {
            event.preventDefault();
            this.props.auth
            .createUserWithEmailAndPassword(this.props.email, this.props.password)
            .then((authUser) => {
              return authUser.user.updateProfile({
                displayName: this.props.username
              })
            })
            .catch((error) => alert(error.message));
        
            //close modal
            this.props.setOpen(false);
          }
        return (
            <Modal
                open={this.props.open}
                onClose={() => this.props.setOpen(false)}
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
                    placeholder="username"
                    type="text"
                    value={this.props.username}
                    onChange={(e) => this.props.setUsername(e.target.value)}
                    />
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
                    <Button type="submit" onClick={signUp}> Sign Up </Button>
                </form>
                </div>
            </Modal>
        )
    }
}