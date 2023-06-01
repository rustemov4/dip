import React from "react";
import Dashboard from "./sidemenu";
import {Button, Form, Modal, Pagination, Table} from "react-bootstrap";
import axios from "axios";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            currentPage: 1,
            pageCount: 0,
            show: false,
            selectedAccount: "",
            cars: []
        }
    }

    componentDidMount() {
        const curUser = localStorage.getItem("user")
        if (curUser === null) window.location.href = "http://localhost:3000/"
        axios.get('http://localhost:8080/api/v1/accounts')
            .then(response => {
                this.setState({
                    pageCount: Math.ceil(response.data.length / 12),
                    accounts: response.data
                })
            }).catch(error => {
            console.error(error);
        });
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }
    handleShow = (account) => {
        this.handleCars(account)
        this.setState({
            show: true,
            selectedAccount: account
        })
    }
    handleCars = (account) => {
        axios.get('http://localhost:8080/api/v1/devices', {
            params: {
                accountID: account
            }
        })
            .then(response => {
                this.setState({
                    cars: response.data
                })
            }).catch(error => {
            console.error(error);
        })
    }
    renderTableData = () => {
        const start = (this.state.currentPage - 1) * 12;
        const end = start + 12;
        const items = this.state.accounts.slice(start, end).map((account, index) => (
            <tr key={index}>
                <td>{account.accountID}</td>
                <td>{account.password}</td>
                <td>{account.creationtime}</td>
                <td>{account.lastlogintime}</td>
                <td>{<Button className={"w-100"} onClick={() => this.handleShow(account.accountID)}>Cars</Button>}</td>
            </tr>
        ));
        return items
    }
    renderPaginationItems = () => {
        const items = [];
        for (let number = 1; number <= this.state.pageCount; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === this.state.currentPage}
                    onClick={() => {
                        this.setState({
                            currentPage: number
                        })
                    }
                    }
                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    }

    render() {
        return (
            <div className={"d-flex"}>
                <Dashboard/>
                <div className={"d-flex justify-content-center align-items-center w-100"} style={{height: "100vh"}}>
                    <div style={{width: "65%"}} className={"mt-5"}>
                        {this.state.accounts.length > 0 &&
                            <Table responsive={true} striped bordered hover>
                                <thead>
                                <tr>
                                    <th>AccountID</th>
                                    <th>Password</th>
                                    <th>Creation time</th>
                                    <th>Last login</th>
                                    <th>Cars</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.renderTableData()
                                }
                                </tbody>
                                <Pagination className={"mt-2"}>{this.renderPaginationItems()}</Pagination>
                            </Table>
                        }
                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cars of {this.state.selectedAccount} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {
                            this.state.cars.map(car => (
                                <div>{car.deviceID}</div>
                            ))
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={"outline-danger"}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Users