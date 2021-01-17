import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'

import Register from './components/authentication/Register'
import Login from './components/authentication/Login'

import {GlobalProvider} from './context/GlobalState'
import './App.css'

function App() {

  
  return (
    <GlobalProvider>
    <BrowserRouter>
    <div>
      
       <Navbar/> 
      <Switch>
        <Route exact path ="/" ></Route>        
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        
      </Switch>
    </div>
    </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;

