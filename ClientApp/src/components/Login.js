/// <reference path="navmenu.js" />
import React, { Component, createRef, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Router, useHistory } from "react-router-dom";
import '../css/Login.css';
import { Link } from "react-router-dom";
import { UserList } from "./UserList";

// 유저 데이터 불러오고 사용자 리스트를 화면에 렌더링하기

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

    RunPressEnter(event) {
        if (event.key === "Enter") {
            console.log("Enter");
            window.location.href = "./UserList";
        }
    }

    async doLogin(id, password) {
        // UnserInfoContaller/requestLogin 함수
        const res = await fetch('/UserInfo/requestLogin', {
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
            
            if (result.success == true) {
                sessionStorage.setItem("ID", result.userInfo.id);
                sessionStorage.setItem("name", result.userInfo.name);
                sessionStorage.setItem("login", result.success);
                sessionStorage.setItem("password", result.userInfo.passWord);
           
                window.location.href = "./UserListControl";


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
                        <button className="loginBtn" type="submit" formMethod="post" onClick={this.clickLogin} onKeyPress={this.RunPressEnter}>로그인</button>
                    </div>
                </div>
            </div>
        )
    }
}