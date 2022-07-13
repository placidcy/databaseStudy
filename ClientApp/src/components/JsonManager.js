import React, { Component } from "react";

export class JsonManager extends Component {
    makeUserLogin(id, password) {
        const json = {
            "login":
            {
                "userID": id,
                "password": password
            }
        }

        return JSON.stringify(json);
    }
}