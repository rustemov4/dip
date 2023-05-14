import React from "react";
import {Button, Form} from "react-bootstrap";
import Menu from "./menu";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            checkPassword: ""
        }
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

    render() {
        return (
            <div>
                <Menu/>
                <div className={"d-flex justify-content-center align-items-center w-100"} style={{height: "100vh"}}>
                    <Form>
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
                </div>
            </div>
        )
    }
}

export default Register