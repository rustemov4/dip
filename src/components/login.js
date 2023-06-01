import React from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorText: ""
        }
    }

    send = () => {
        axios.post('http://localhost:8080/api/v1/login', {
            accountID: this.state.email,
            password: this.state.password
        }).then(response => {
            const token = response.data;
            const payload = token.split('.')[1];
            const decodedPayload = atob(payload);
            console.log(JSON.parse(decodedPayload));
            localStorage.setItem("user", decodedPayload)
            window.location.href = `http://localhost:3000/routesMap`
        }).catch(error => {
            this.setState({
                errorText: "Invalid login or password!"
            })
            console.error(error);
        });

    }

    emailOnChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    passwordOnChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div className={"d-flex justify-content-center align-items-center"}
                 style={{height: "100vh"}}>
                <div className={"shadow-lg login_container"}>
                    <div>
                        <img src={"https://roadcaraccessories.com/wp-content/uploads/2022/09/16.jpg"} className={"login_img"}/>
                    </div>
                    <Form className={"bg-light shadow-lg rounded w-100"}
                          style={{padding: "20px"}}>
                        <h1>Login</h1>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type={"text"} placeholder={"Enter email"}
                                          onChange={this.emailOnChange}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={"password"} placeholder={"Enter password"}
                                          onChange={this.passwordOnChange}></Form.Control>
                        </Form.Group>
                        <Button onClick={this.send} className={"mt-3"} variant="outline-primary">Submit</Button>
                        {this.state.errorText !== "" && (
                            <div className={"badge bg-danger text-wrap p-3 mt-2 w-100"}> {this.state.errorText}
                            </div>
                        )}
                    </Form>
                </div>
            </div>

        )
    }
}

export default Login