import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import logo from './logo.svg';
import './App.css';
import "./layouts/Layout";
import Layout from './layouts/Layout';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Layout />
    </Router>
  );
}

export default App;
