import { Button } from 'bootstrap';
import React, { Component } from 'react';
import "../css/Join.css";
import { Link } from "react-router-dom";

export class Join extends Component {
    render() {
        return (
            <div className="joinBox">
                <h2 className="title">회원 가입 정보</h2>
                <div className="ID_Box inputBox">
                    <label for="ID">ID : </label>   
                    <input type="text" id="ID" />
                </div>

                <div className="password_Box inputBox">
                    <label for="password">PW : </label>
                    <input type="text" id="password" />
                </div>

                <div className="checkPassWord_Box inputBox">
                    <label for="checkPW">PW 확인 : </label>
                    <input type="password" id="checkPW" />
                </div>

                <div className="name_Box inputBox">
                    <label for="name">이름 : </label>
                    <input type="text" id="name" />
                </div>

                <div className="email_Box inputBox">
                    <label for="email">이메일 : </label>
                    <input type="text" id="email" />
                </div>

                <div className="btnBox inputBox">
                    <button className="joinBtn">가입</button>
                    <Link to="/"><button className="cancelBtn">취소</button></Link>
                </div>
            </div>
        )
    }
}