import React, { Component, useState } from 'react';
import "../css/UserList.css";
import { Link } from "react-router-dom";


export class UserList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const res = fetch("/UserInfo/requestUserData");

        res.then((response) => { response.json() })
            .then((data) => { console.log(data) });
    }

    //displayUI = () => {
    //    let displayUI = [];

    //    if (userList === null || userList === undefined)
    //        return null;

    //    for (let i = 0; i < userList.length; i++) {
    //        let user = userList[i];

    //        displayUI.push(
    //            <tr>
    //                {/*<td><input class="checkBox" type="checkbox"></input></td>*/}
    //                {/*<td>{user.ID}</td>*/}
    //                {/*<td>{user.name}</td>*/}
    //                {/*<td>{user.email}</td>*/}
    //                {/*<td>*/}
    //                {/*    <Link to="/modifyUserInfo">*/}
    //                {/*        <button type="button">수정</button>*/}
    //                {/*    </Link>*/}
    //                {/*</td>*/}
    //            </tr>
    //        )
    //    }
    //};

    //PrintUserList = () => {
    //    this.state.data.map(ele => {
    //        return (
    //            <>
    //                <td><input class="checkBox" type="checkbox"></input></td>
    //                <td>{}</td>
    //                <td>{}</td>
    //                <td>{}</td>
    //                <td>
    //                    <Link to="/modifyUserInfo">
    //                        <button type="button">수정</button>
    //                    </Link>
    //                </td>
    //            </>
    //        )
    //    })
    //}
  

    render() {
        /*let printUserList = this.PrintUserList;*/

        /*let displayUI = this.displayUI(); // this -> 클래스 내부의 displayUI 변수*/

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
                            <td>test</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}