import React, { Component, createRef } from 'react';
import { useHistory } from "react-router-dom";
import '../css/Login.css';
import { Link } from "react-router-dom";

export class Login extends Component{

    constructor(props) {
        super(props);

        //const userID = React.createRef();
        //const userPassWord = React.createRef();
    }

    clickLogin = () => {
        const id = document.querySelector(".ID_section #inputID");
        const password = document.querySelector(".pass_section #inputPass");

        console.log(id.value);
        console.log(password.value);

        if (id.value == null) {
            console.log("id칸 비어있음");
            return;
        }

        if (password.value == null) {
            console.log("password칸이 비어있음");
            return;
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
                password : password
                
            }),
        });

        console.log(res);
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