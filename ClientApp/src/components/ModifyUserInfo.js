﻿import React, { Component } from 'react';
import '../css/modifyUserInfo.css';

export class ModifyUserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo : null
        }

        // this.props : ModifyUserInfo의 props값 / props : 외부에서 전달된 값
        this.props = props;

        console.log(this.props.userInfo);
    }

    ClickModifyInfo = () => {
        const nameBox = document.querySelector(".modifyInfoBox .name_box input");
        console.log(nameBox.value);

        const emailBox = document.querySelector(".modifyInfoBox .email_box input");
        console.log(emailBox.value);
       
        if (nameBox.value.length <= 0 && emailBox.value.length <= 0) {
            alert("변경할 이름과 이메일이 입력되지 않음");
            return;
        } else if (emailBox.value.length <= 0) {
            alert("변경할 이메일이 입력되지 않음");
            return;
        } else if (nameBox.value.length <= 0) {
            alert("변경할 이름이 입력되지 않음");
            return;
        }

        this.LoadUserListData(nameBox.value, emailBox.value, this.props.userInfo.id);
    }

    Goback = () => {
        this.props.history.goBack();
    }

    async LoadUserListData(userName, userEmail, ID) {
        let result;

        let response = await fetch('/UserInfo/ModifyUserInformation', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: ID,
                userName: userName,
                userEmail: userEmail
            })
        })

        if (response.ok) {
            result = await response.json();

        } else {
            console.log("데이터를 불러오지 못함");
        }
    }

    render() {
        return (
            <div className="modifyInfoBox">
                <h1 className="title">회원 정보 변경</h1>
               
                <div className="name_box changeInfoBox">
                    <div className="contentBox">
                        <h2>이름</h2>
                        <input type="text" ></input>
                    </div>
                </div>

                <div className="email_box changeInfoBox">
                    <div className="contentBox">
                        <h2>EMAIL</h2>
                        <input type="text" ></input>
                    </div>
                </div>

                <button onClick={this.ClickModifyInfo}>수정</button>
                <button onClick={this.Goback}>취소</button>
            </div>
        )
    }
}