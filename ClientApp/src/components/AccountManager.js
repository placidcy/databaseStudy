import React, { Component } from "react";
import "./JsonManager";

export class AccountManager extends Component {
    async checkLogin() {
        const userResource = await fetch("../jsonFIles/userList.json", {
            method: 'post',
            headers: {
                "Contents-Type" : "application/json"
            },

            body: JSON.stringify({
                
            });
        });
    }
}