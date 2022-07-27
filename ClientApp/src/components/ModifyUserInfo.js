import React, { Component } from 'react';
import '../css/modifyUserInfo.css';

export class ModifyUserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: []
        }
    }

    componentDidMount() {
        this.LoadUserListData();
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
            this.setState({ userInfo: result });

        } else {
            console.log("데이터를 불러오지 못함");
        }
    }

    render() {
        return (
            <div className="modifyInfoBox">
                <h2 className="title">회원 정보 변경</h2>
                <div className="ID_box inputBox">
                    <span>ID(Primary Key): </span>
                    <span className="ID">{}</span>
                </div>

                <div className="name_box changeInfoBox">
                    <div className="contentBox">
                        <span>이름: </span>
                        <span className="content">테스트 이름</span>
                    </div>
                    <div className="modifyBox">
                        <label for="changeName">변경할 이름</label>
                        <input type="text" name="changeName"></input>
                    </div>
                </div>

                <div className="email_box changeInfoBox">
                    <div className="contentBox">
                        <span>EMAIL: </span>
                        <span className="content">테스트 이메일</span>
                    </div>

                    <div className="modifyBox">
                        <label for="changeEmail">변경할 이메일</label>
                        <input type="text" name="changeEmail"></input>
                     </div>
                </div>

                <button type="submit">수정</button>
            </div>
        )
    }
}