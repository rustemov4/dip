import React from "react";
import axios from "axios";
import {Table, Pagination, Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./sidemenu";


class Devices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            currentPage: 1,
            pageCount: 0,
            show: false,
            selectedCar: ""
        }
    }

    componentDidMount() {
        const curUser = localStorage.getItem("user")
        if (curUser === null) window.location.href = "http://localhost:3000/"
        const parsed = JSON.parse(curUser)
        axios.get('http://localhost:8080/api/v1/devices',{
            params: {
                accountID: parsed.sub
            }
        })
            .then(response => {
                this.setState({
                    cars: response.data,
                    pageCount: Math.ceil(response.data.length / 12)
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
    handleShow = (carId) => {
        this.setState({
            show: true,
            selectedCar: carId
        })
    }
    delete = () => {
        const filtered = this.state.cars.filter(car => car.deviceID !== this.state.selectedCar)
        this.setState({
            cars: filtered,
            show: false
        })
    }
    renderTableData = () => {
        const start = (this.state.currentPage - 1) * 12;
        const end = start + 12;
        const items = this.state.cars.slice(start, end).map((car, index) => (
            <tr key={index}>
                <td>{car.deviceID}</td>
                <td>{car.vehicleMake}</td>
                <td>{car.vehicleModel}</td>
                <td>{car.simPhoneNumber}</td>
                <td>{car.equipmentType}</td>
                {/*<td><Button variant={"outline-danger"} onClick={() => this.handleShow(car.deviceID)}>Delete car</Button>*/}
                {/*</td>*/}
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
                        {this.state.cars.length > 0 &&
                            <Table responsive={true} striped bordered hover>
                                <thead>
                                <tr>
                                    <th>DeviceID</th>
                                    <th>Vehicle Make</th>
                                    <th>Vehicle Model</th>
                                    <th>Phone number</th>
                                    <th>Equipment Type</th>
                                    {/*<th>Delete car</th>*/}
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
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>Are you sure you want to delete the car {this.state.selectedCar}?</h2>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={"outline-danger"} onClick={() => this.delete()}>Delete car</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Devices