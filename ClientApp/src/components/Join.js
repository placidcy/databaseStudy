import { Button } from 'bootstrap';
import React, { Component } from 'react';
import "../css/Join.css";
import { Link } from "react-router-dom";

export class Join extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: null
        }

        this.LoadUserData = this.LoadUserData.bind(this);
    }

    componentDidMount() {
        console.log(this.state.userData);
    }

    LoadUserData = async (inputUserID, inputName, inputEmail, inputPhone, inputPassword) => {
        let response = await fetch("/UserInfo/JoinUser", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserID: inputUserID,
                Name: inputName,
                Email: inputEmail,
                PhoneNumber: inputPhone,
                PassWord: inputPassword
            })
        })

        if (response.ok == true) {
            let data = await response.json();
            console.log(data);

            this.setState({ userData: data });
            console.log(this.state.userData);

        } else {
            console.log("JoinUser 실행 실패");
        }
    }

    ClickJoinBtn() {
        const userID = document.querySelector(".joinBox #ID");
        const password = document.querySelector(".joinBox #password");
        const checkPassword = document.querySelector(".joinBox #checkPassword");
        const name = document.querySelector(".joinBox #name");
        const email = document.querySelector(".joinBox #email");
        const phoneNumber = document.querySelector(".joinBox #phoneNumber");
       
        this.LoadUserData(userID.value, name.value, email.value, phoneNumber.value, password.value);
        

        console.log(this.state.userData.userInfo.userID);
    }

    render() {
        return (
            <div className="joinBox">
                <h2 className="title">회원 가입 정보</h2>
                <div className="ID_Box inputBox">
                    <label for="ID">ID : </label>
                    <input type="text" id="ID" />
                </div>

                <div className="password_Box inputBox">
                    <label for="password">비밀번호 : </label>
                    <input type="password" id="password" />
                </div>

                <div className="checkPassWord_Box inputBox">
                    <label for="checkPassword">비밀번호 확인 : </label>
                    <input type="password" id="checkPassword" />
                </div>

                <div className="name_Box inputBox">
                    <label for="name">이름 : </label>
                    <input type="text" id="name" />
                </div>

                <div className="email_Box inputBox">
                    <label for="email">이메일 : </label>
                    <input type="text" id="email" />
                </div>

                <div className="phoneNumberBox inputBox">
                    <label for="phoneNumber">전화번호 : </label>
                    <input type="text" id="phoneNumber" />
                </div>

                <div className="btnBox inputBox">
                    <button className="joinBtn" onClick={this.ClickJoinBtn}>가입</button>
                    <Link to="/"><button className="cancelBtn">취소</button></Link>
                </div>
            </div>
        )
    }
}