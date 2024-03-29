import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { UserList } from './components/UserList';
import { Login } from './components/Login';
import { Join } from './components/Join';
import { ModifyUserInfo } from './components/ModifyUserInfo';
import { ChangePassWord } from './components/ChangePassWord';
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

                  <Route path='/UserListControl' component={SubApp} />
                  {/* <Route path='/ModifyUserInfo' component={SubApp} /> */}
                <Route path='/ChangePassWord' component={SubApp} />
             </Switch>
        </Router>
    );
  }
}
