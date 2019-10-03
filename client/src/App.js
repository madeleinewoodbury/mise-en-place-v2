import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Fragment>
    </Provider>
  );
};

export default App;
