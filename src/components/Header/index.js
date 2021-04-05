import * as React from 'react';
//import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './Header.css'

function backToTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

export default class Header extends React.Component {
    render(){
        return (
        <header className="app__header">
            <img
            className="app__headerImage"
            src="/../images/instagram-header.svg"
            alt=""
            onClick= {backToTop()}
            />
            <div className="app__loginContainer">
            { //Check if is logged in
                this.props.user? (
                <Button onClick={() => this.props.auth.signOut()}> Logout </Button>
                ) : (
                <div className="app__loginLeft"> 
                    <Button onClick={() => this.props.setOpenSignIn(true)}> Sing In </Button>
                    <Button onClick={() => this.props.setOpen(true)}> Sing Up </Button>
                </div>
                )
            }
            <div>

            </div>

            </div>
        
        </header>
        )
    }
}