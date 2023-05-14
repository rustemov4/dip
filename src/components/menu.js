import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Navbar bg="light" expand="lg" className={"p-2"}>
                <Navbar.Brand href="#home">VTS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={"/routesMap"} className={"link ms-2 text-decoration-none"}>Routes history</NavLink>
                        <NavLink to={"/lastPosition"} className={"link ms-2 text-decoration-none"}>Last position </NavLink>
                        <NavLink to={"/devices"} className={"link ms-2 text-decoration-none"}>Devices </NavLink>
                        <NavLink to={"/register"} className={"link ms-2 text-decoration-none"}>Register User </NavLink>
                        <NavLink to={"/"} className={"link ms-2 text-decoration-none"}>Log out </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Menu