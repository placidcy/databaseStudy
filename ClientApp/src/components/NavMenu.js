import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/NavMenu.css';

// state값으로 유저 정보 불러오고 화면에 렌더링

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            onLoginState: ""
        };

        this.userName = sessionStorage.getItem("name");
        this.loginstate = sessionStorage.getItem("login");
    }

    SetLoginMenuText = () => {
        const loginTextCont = document.querySelector(".navbar-expand-sm .LoginState");

        if (this.loginstate == "true") {
            /* this.setState({ onLoginState: "로그아웃" });*/
            loginTextCont.innerText = "로그아웃";

        } else {
            /*this.setState({ onLoginState: "로그인" });*/
            loginTextCont.innerText = "로그인";
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    componentDidMount() {
        this.SetLoginMenuText();
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">로그인 페이지</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark userName" to="/modifyUserInfo">{this.userName}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark LoginState" to="/UserList"></NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
