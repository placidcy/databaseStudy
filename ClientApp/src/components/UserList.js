import React, { Component, useState } from 'react';
import "../css/UserList.css";
import { Link } from "react-router-dom";
import { ModifyUserInfo } from './ModifyUserInfo';

// 회원정보 수정
// 수정 버튼 누르면 회원 정보 페이지로 넘어가기
// 페이지에서 해당하는 회원 정보 출력
// 수정하면 다시 회원 목록으로 돌아가고 수정된 데이터가 표현되게 구현

// selectuserId 함수 만들기
// UserList , modifyuserInfo 감싸는 컴포넌트 하나 생성
// 유저 id와 출력된 정보의 id 비교


export class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: [],
            pageMode: ""
        }
    }

    SelectID() {
        let UI = this.displayUI();

        let findResult = UI.find(ele => {
            const ID_tag = document.querySelector(".table tr td:nth-child(2)");
            if (ele.value == ID_tag.value) {
                return ele.value;
            } else {
                return null;
            }
        })

        for (let count = 0; count < this.state.userList.length; count++) {
            if (this.state.userList[count].userInfo.id == findResult) {
                return this.state.userList[count].userInfo.id;
            }

            else {
                return null;
            }
        }
    }

    componentDidMount() {
        this.setState({pageMode : "UserList"});
    }

    displayUI = () => {
        let arrDisplayUI = [];

        this.LoadUserListData();

        if (this.state.userList === null || this.state.userList === undefined)
            return null;

        //if (this.state.mode === "UserList") {`
        //    return <UserList />;
        //} else if (this.state.mode === "ModifyUserInfo") {
        //    return <ModifyUserInfo />;
        //}

        for (let i = 0; i < this.state.userList.length; i++) {
            arrDisplayUI.push(
                <tr>
                    <td><input class="checkBox" type="checkbox"></input></td>
                    <td>{this.state.userList[i].userInfo.id}</td>
                    <td>{this.state.userList[i].userInfo.name}</td>
                    <td>{this.state.userList[i].userInfo.email}</td>
                    <td>
                        <button>수정</button>
                    </td>
                </tr>
            )
        }
        return arrDisplayUI;
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

        } else {
            console.log("데이터를 불러오지 못함");
        }
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
                         {displayUIData}  
                    </tbody>
                </table>
            </div>
        );
    }
}