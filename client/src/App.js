import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Fragment>
  );
};

export default App;
