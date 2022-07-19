import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { UserList } from './components/UserList';
import { Login } from './components/Login';
import { Join } from './components/Join';
import { ModifyUserInfo } from './components/ModifyUserInfo';
import './custom.css'

export default class SubApp extends Component {

  render () {
      return (
          <Layout>
              <Route path='/UserList' component={UserList} />
       
              <Route path='/ModifyUserInfo' component={ModifyUserInfo} />
          </Layout>
    );
  }
}
