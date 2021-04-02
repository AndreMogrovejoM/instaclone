import './App.css';
import React, {useState, useEffect} from 'react';
import{ db, auth } from './backend/firebase';
import Post from './components/Post';
import PostThumb from './components/PostThumb';
import ImageUpload from './components/ImageUpload';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import InstagramEmbed from 'react-instagram-embed';
import LazyLoad from "react-lazyload";
import MenuPopupState from "./components/MenuPopupState"


function backToTop(){
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Spinner = () => (
  <div className="post__loading">
    <img alt="Loading..." src="https://i.gifer.com/ZZ5H.gif" width="20" />
    <h5>Loading...</h5>
  </div>
);

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);


  // useEffect runs a a piece of code based on a specific condition
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        setUser(authUser);

        if (authUser.displayName) {
          //dont update username
        } else {
          //if we just created someone
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        // user has logged out...
        setUser(null);
      }
      return () => {
        //perform some cleanUp
        unsubscribe();
      }
    })
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //every time a new post is added, this code fires
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    //close modal
    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));
    //close modal
    setOpenSignIn(false);
  }


  return (
    
    <div className="App">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}> Sign Up </Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}> Sign In </Button>
          </form>
        </div>
      </Modal>

      {/* Header */}
      <header className="app__header">
        <img
          className="app__headerImage"
          src="/../images/instagram-header.svg"
          alt=""
          onClick= {backToTop()}
        />
        <div className="app__loginContainer">
          { //Check if is logged in
            user? (
              <Button onClick={() => auth.signOut()}> Logout </Button>
            ) : (
              <div className="app__loginLeft"> 
                <Button onClick={() => setOpenSignIn(true)}> Sing In </Button>
                <Button onClick={() => setOpen(true)}> Sing Up </Button>
              </div>
            )
          }
          <div>

          </div>

        </div>
       
      </header>
      {/* end header */}

      <div className="app__posts">
        <div className="app__postsLeft">
          {
            posts.map(({id, post}) => (
              <Post key={id}
              postId = {id}
              user = {user}
              username={post.username}
              caption={post.caption}
              imgUrl={post.imgUrl}/>
            ))
          }

        </div>
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
      </div>     

      {user?.displayName ? (
              <ImageUpload username={user.displayName}/>
            ) : (
              <h3 className="app__logintext"><center>Login to upload...</center></h3>
            )}
    </div>
  );
}

export default App;
