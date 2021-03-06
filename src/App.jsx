import React from 'react';
import { HashRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import "./layouts/Layout";
import Layout from './layouts/Layout';

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
