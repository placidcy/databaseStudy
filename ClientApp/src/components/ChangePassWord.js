import React, { Component } from 'react';
import '../css/ChangePassWord.css';

export class ChangePassWord extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="password_Box inputBox">
                <label for="password">PW 변경 : </label>
                <input type="password" name="password" id="password" />
            </div>
        )
    }
}



