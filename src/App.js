import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Project from "../src/components/layout/Project";
import User from '../src/components/layout/User';
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Home from './components/layout/Home'
import profile from "./components/auth/profile";
import ConfigPage from "./components/layout/ConfigPage"
import React, { useState,Component, useContext, useEffect } from "react";
import OwnerDashboard from "./components/owner/OwnerDashboard";
import DeveloperDashboard from "./components/developer/DeveloperDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";


import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
           <Route exact path="/" component={Home} />             
           <Navbar />        

              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/notice" component={Register} />

              <Switch> 
 
              <PrivateRoute exact path="/users" component={User} />
              <PrivateRoute exact path="/projects" component={Project} />
              <PrivateRoute path="/owner-dashboard" component={OwnerDashboard} requiredRole="OWNER" />
            <PrivateRoute path="/developer-dashboard" component={DeveloperDashboard} requiredRole="DEVELOPER" />
            <PrivateRoute path="/admin-dashboard" component={AdminDashboard} requiredRole="ADMIN" />
           
             <PrivateRoute exact path="/dashboard" component={Dashboard} />
             <PrivateRoute exact path="/profile" component={profile} />
             <PrivateRoute path='/config' component={ConfigPage} />

            </Switch>
            
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;