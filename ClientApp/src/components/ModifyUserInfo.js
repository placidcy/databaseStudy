import React, { Component } from 'react';
import '../css/modifyUserInfo.css';

export class ModifyUserInfo extends Component {
    state = {
        userList: []
    }

    async LoadUserListData() {
        let result;

        let response = await fetch('/UserInfo/requestUserDatas', {
            method: "POST",
            headers: {
                "contents-type": "application/json",
            },
            body: null
        })

        if (response.ok) {
            result = await response.json();
            
            this.setState({ userList: result });

            console.log(this.state.userList);

        } else {
            console.log("데이터를 불러오지 못함");
        }
    }


    render() {
        this.LoadUserListData();

        return (
            <div className="modifyInfoBox">
                <h2 className="title">회원 정보 변경</h2>
                <div className="ID_box inputBox">
                    <span>ID: </span>
                    <span className="ID">{}</span>
                </div>

                <div className="PW_box inputBox">
                    <label>PW 변경: </label>
                    <input type="password"></input>
                </div>

                <div className="name_box inputBox">
                    <label>이름 변경: </label>
                    <input type="text"></input>
                </div>

                <div className="email_box inputBox">
                    <label>EMAIL 변경: </label>
                    <input type="text"></input>
                </div>
            </div>
        )
    }
}