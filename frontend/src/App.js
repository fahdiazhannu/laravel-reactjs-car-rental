import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';

import "./App.css";

import PublicRoute from './PublicRoute';


import Page403 from './error/Page403'
import Page404 from './error/Page404'

import Home from './components/frontend/Home';
import About from './components/frontend/About'
import Contact from './components/frontend/Contact'


import Login from './components/frontend/auth/Login'
import Daftar from './components/frontend/auth/Daftar'
import AdminPrivateRoute from './AdminPrivateRoute'


import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Accept'] = "application/json";
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

           <Route path="/page403" component={Page403} />
           <Route path="/page404" component={Page404} />

<AdminPrivateRoute  path='/admin' name="Admin"/>
           <PublicRoute path="/" name="Home" />
           {/* <Route path="/login" component={Login} />
           <Route path="/daftar" component={Daftar} /> */}

           <Route path="/login">
              {localStorage.getItem('auth_token') ? <Redirect to='/login' /> : <Login />}
           </Route>
           <Route path="/register">
              {localStorage.getItem('auth_token') ? <Redirect to='/register' /> : <Daftar />}
           </Route>
           {/* <Route path="/admin" name="Admin" render={(props)=> <MasterLayout {...props} /> } /> */}
           

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
