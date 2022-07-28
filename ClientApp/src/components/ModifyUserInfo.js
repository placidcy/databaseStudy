import React, { Component } from 'react';
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
        const nameBox = document.querySelector(".changeInfoBox input");
        console.log(nameBox.value);
        const emailBox = document.querySelector(".changeInfoBox input");
        console.log(emailBox.value);

        this.LoadUserListData(nameBox.value, emailBox.value, 1);
    }

    async LoadUserListData(userName, userEmail, ID) {
        let result;

        let response = await fetch('/UserInfo/ModifyUserInformation', {
            method: "post",
            headers: {
                "contents-type": "application/json"
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                id: ID
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
            </div>
        )
    }
}