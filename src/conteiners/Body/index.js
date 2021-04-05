import React, {useState, useEffect} from 'react';
import{ db, auth } from '../../backend/firebase';
import Post from '../../components/Post/';
import PostRight from '../../components/PostRight/';
import Header from '../../components/Header/';
import SignIn from '../../components/SignIn/';
import SignUp from '../../components/SignUp/';
import ImageUpload from '../../components/ImageUpload/';
import { getModalStyle, useStyles } from '../../components/ModalStyles.js'
import { Route } from 'react-router-dom';


/* 
import LazyLoad from "react-lazyload";
 */

export default function Body() {

    const classes = useStyles();

    /* React Hooks */
    const [modalStyle] = useState(getModalStyle);
  
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);

    
    // useEffect runs a piece of code based on a specific condition
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


    return (
        <div className="Body__app">
                <SignUp 
            auth={auth}
            open={open}
            setOpen={setOpen}
            modalStyle={modalStyle}
            classes={classes}
            email={email}
            username={username}
            setUsername={setUsername}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
        />

        <SignIn
            auth={auth}
            openSignIn={openSignIn}
            setOpenSignIn={setOpenSignIn}
            modalStyle={modalStyle}
            classes={classes}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
        />

        {/* Header */}
        <Route exact={false} path='/' children={
            <Header 
                user={user}
                auth={auth}
                setOpenSignIn={setOpenSignIn}
                setOpen={setOpen}
            />
        }/>
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
            <PostRight />
        </div>     

        {user?.displayName ? (
            <ImageUpload username={user.displayName}/>
            ) : (
            <h3 className="app__logintext"><center>Login to upload...</center></h3>
        )}

        </div>
    );
}