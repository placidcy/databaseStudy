import React, { Component } from 'react';
import '../css/ChangePassWord.css';
import { UserList } from './UserList';
import { UserListControl } from './UserListControl';

export class ChangePassWord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userList : []
        }

        this.ClickModifyPassword = this.ClickModifyPassword.bind(this);
    }

    LoadUserPassword = async (inputPassWord, inputID) => {
        let response = await fetch('/UserInfo/ModifyPassWord', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Password: inputPassWord,
                ID: inputID
            })
        })

        if (response.ok) {
            console.log("데이터 불러오기 성공");
            let result = await response.json();
            this.setState({ userList: result });

            
        } else {
            console.log("데이터를 불러오지 못함");
        }
    }

    ClickModifyPassword() {
        const passwordBtn = document.querySelector(".password_Box #password");
        const currentPassword = document.querySelector(".password_Box #currentPassword");

        if (currentPassword.value != sessionStorage.getItem("password")) {
            alert("현재 비밀번호가 틀림");
            return;
        }

        console.log(passwordBtn.value);

        this.LoadUserPassword(passwordBtn.value, sessionStorage.getItem("ID"));
    }


    render() {
        return (
            <div className="passwordBox"> 
                <div className="currentPassBox">
                    <label for="currentPassword">현재 비밀번호:</label>
                    <input type="password" name="currentPassword" id="currentPassword"></input>
                </div>
                <div className="changePassBox">
                    <label for="password">변경할 비밀번호: </label>
                    <input type="password" name="password" id="password" />
                </div>
                <button className="modify" onClick={this.ClickModifyPassword}>수정</button>
            </div>
        )
    }
}



