import React from "react";
import {Alert, Button, Form} from "react-bootstrap";
import Menu from "./menu";
import Dashboard from "./sidemenu";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            checkPassword: "",
            alert: "",
            color: 'danger'
        }
    }
    componentDidMount() {
        const curUser = localStorage.getItem("user")
        if (curUser === null) window.location.href = "http://localhost:3000/"
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleCheckPasswordChange = (e) => {
        this.setState({
            checkPassword: e.target.value
        })
    }
    handleAddUser = (e) => {
        e.preventDefault()
        if (this.state.email === "" || this.state.password === "" || this.state.checkPassword === "") {
            this.setState({
                alert: "Fill all fields",
            })
            return
        }
        if (this.state.password.length < 5) {
            this.setState({
                alert: "Password length is short",
            })
            return
        }
        if (this.state.password !== this.state.checkPassword) {
            this.setState({
                alert: "Passwords don't match",
            })
            return
        }
        const body = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState({
            alert: "User created",
            color: 'success'
        })
    }

    render() {
        return (
            <div className={"d-flex"}>
                <Dashboard/>
                <div className={"d-flex justify-content-center align-items-center w-100"} style={{height: "100vh"}}>
                    <div>
                        <Form className={"bg-light shadow-lg rounded"} style={{height: "350px", padding: "20px"}}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address or login</Form.Label>
                                <Form.Control type="text" placeholder="Enter email or login"
                                              onChange={this.handleEmailChange}/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              onChange={this.handlePasswordChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Check password</Form.Label>
                                <Form.Control type="password" placeholder="password"
                                              onChange={this.handleCheckPasswordChange}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.handleAddUser}>
                                Submit
                            </Button>
                        </Form>
                        {this.state.alert !== "" &&
                            <Alert variant={this.state.color} className={"mt-2"}>{this.state.alert}</Alert>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Register