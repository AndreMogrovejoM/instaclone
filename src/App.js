import './App.css';
import React from 'react';
import Body from './conteiners/Body/'
import { Route } from 'react-router-dom';
import Profile from './conteiners/Profile';
function App() {
  return (
    
    <div className="App">
      <Route exact={true} path='/' component={Body}/>
      <Route exact={true} path='/profile' component={Profile}/>
      
    </div>
  );
}

export default App;
