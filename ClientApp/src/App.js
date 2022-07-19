import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { UserList } from './components/UserList';
import { Login } from './components/Login';
import { Join } from './components/Join';
import { ModifyUserInfo } from './components/ModifyUserInfo';
import './custom.css'
import SubApp from './subApp';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (

        <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/join' component={Join} />

                <Route path='/UserList' component={SubApp} />
                <Route path='/ModifyUserInfo' component={SubApp} />
             </Switch>
        </Router>
    );
  }
}
