import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { UserList } from './components/UserList';
import { UserListControl } from './components/UserListControl';

import { ModifyUserInfo } from './components/ModifyUserInfo';
import { ChangePassWord } from './components/ChangePassWord';
import './custom.css'

export default class SubApp extends Component {

  render () {
      return (
          <Layout>
              {/*
               * <Route path='/UserList' component={UserList} />
               * <Route path='/ModifyUserInfo' component={ModifyUserInfo} />
              */}
              <Route path='/UserListControl' component={UserListControl} />
              <Route path='/ChangePassWord' component={ChangePassWord} />
          </Layout>
    );
  }
}
