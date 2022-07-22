import React, { Component, useState } from 'react';
import "../css/UserList.css";
import { Link } from "react-router-dom";

// 회원정보 수정
// 수정 버튼 누르면 회원 정보 페이지로 넘어가기
// 페이지에서 해당하는 회원 정보 출력
// 수정하면 다시 회원 목록으로 돌아가고 수정된 데이터가 표현되게 구현

export class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: {}
        }
    }

    displayUI = () => {
        let arrDisplayUI = [];

        if (this.state.userList === null || this.state.userList === undefined)
            return null;

        for (let i = 0; i < this.state.userList.length; i++) {
            let user = this.state.userList[i];

            arrDisplayUI.push(
                <tr>
                    <td><input class="checkBox" type="checkbox"></input></td>
                    <td>{user.ID}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <Link to="/modifyUserInfo">
                            <button type="button">수정</button>
                        </Link>
                    </td>
                </tr>
            )
        }

        return arrDisplayUI;
    };

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
            this.state.userList = result;

        } else {
            console.log("데이터를 불러오지 못함");
        }
    }

    componentDidMount() {
        this.LoadUserListData();
    }
  

    render() {
        let displayUIData = this.displayUI();

        return (
            <div>
                <h1 id="tabelLabel" >사용자 리스트</h1>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>사용자 이름</th>
                            <th>이메일</th>
                            <th>수정</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {displayUIData}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}