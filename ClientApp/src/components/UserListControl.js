import React, { Component, useState } from 'react';
import "../css/UserList.css";
import { Link } from "react-router-dom";
import { ModifyUserInfo } from './ModifyUserInfo';
import { UserList } from './UserList';

export class UserListControl extends Component {
    static Mode = {
        UserList: 0,
        ModifyUserInfo: 1,
    }

    constructor(props) {
        super(props);

        this.state = {
            mode: UserListControl.Mode.UserList,
            selectUserInfo: null,
        }
    }

    LoadUserInfo = (userInfo) => {
        this.setState({ mode: UserListControl.Mode.ModifyUserInfo, selectUserInfo: userInfo });
    }

    displayUI = () => {
        let displayUI = null;

        if (this.state.mode === UserListControl.Mode.UserList) {
            displayUI = <UserList LoadUserInfo={this.LoadUserInfo} />;
        } else if (this.state.mode === UserListControl.Mode.ModifyUserInfo) {
            displayUI = <ModifyUserInfo userInfo={this.state.selectUserInfo} />;
        }

        return displayUI;
    }

    render() {
        let displayUI = this.displayUI();

        return (
            <>
                {displayUI }
            </>
        )
    }
}