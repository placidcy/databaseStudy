﻿import React, { Component, createRef } from 'react';
import { BrowserRouter, Route, Router, useHistory } from "react-router-dom";
import '../css/Login.css';
import { Link } from "react-router-dom";
import { UserList } from "./UserList";

export class Login extends Component{
    constructor(props) {
        super(props);
    }

    clickLogin = () => {
        const id = document.querySelector(".ID_section #inputID");
        const password = document.querySelector(".pass_section #inputPass");

        if (id.value == null) {
            alert("아이디 칸이 비어 있음");
        }

        if (password.value == null) {
            alert("비밀번호 칸이 비어 있음");
        }

        this.doLogin(id.value, password.value);
    }
    
    /*async doLogin(id, password) {
        const res = await fetch('/User/Test/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
            }),
        });
    }*/

    async doLogin(id, password) {
        // UnserInfoContaller/requestUserData 함수
        const res = await fetch('/UserInfo/requestUserData', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                password: password
            })
        })

        if (res.ok) {
            let result = await res.json();
            console.log(res);

            if (result.success == true) {
                /*window.location.href = "./UserList";*/
                // 임의 버튼을 만들어서 안보이게 수정하고 <Link> 태그로 클릭하면 페이지 이동

                window.location.href = "./UserList";

            } else {
                alert("아이디 또는 비밀번호가 일치하지 않음");
            }
        }
    }

    render() {
        return (
            <div className="LoginSection">
                <div className="LoginBox">
                    <div className="ID_section">
                        <span>ID : </span>
                        <input type="text" id="inputID" />
                    </div>

                    <div className="pass_section">
                        <span>PW : </span>
                        <input type="password" id="inputPass" />
                    </div>

                    <div className="bottomBtnBox">
                        <Link to="/join"><button className="joinBtn" >회원가입</button></Link>
                        <button className="loginBtn" type="submit" formMethod="post" onClick={this.clickLogin}>로그인</button>
                    </div>
                </div>
            </div>
        )
    }
}