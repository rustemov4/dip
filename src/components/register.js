import React from "react";
import {Alert, Button, Form} from "react-bootstrap";
import Dashboard from "./sidemenu";
import axios from "axios";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
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

    handleLoginChange = (e) => {
        this.setState({
            login: e.target.value
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
        if (this.state.login === "" || this.state.password === "" || this.state.checkPassword === "") {
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
            accountID: this.state.login,
            password: this.state.password
        }
        axios.post("http://localhost:8080/api/v1/register", body).then(res => {
            this.setState({
                alert: "User created",
                color: 'success'
            })
        }).catch(e => {
            if (e.response.status === 409) {
                this.setState({
                    alert: "User exists",
                    color: "warning"
                })
            } else {
                this.setState({
                    alert: "Error in creating",
                    color: 'danger'
                })
            }
            console.log(e)
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
                                <Form.Control type="text" placeholder="Enter login"
                                              onChange={this.handleLoginChange}/>
                                <Form.Text className="text-muted">
                                    We'll never share your login with anyone else.
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