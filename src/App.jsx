import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import LogIn from "./pages/LogIn";
import PrivateRoute from "./pages/PrivateRoute";
import "./layouts/Layout";
import Layout from './layouts/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);


function App() {
  return (
    <Router>
      <Route path="/" component={Layout} />
      <Route path="/login" component={LogIn} />
    </Router>
  );
}

export default App;
