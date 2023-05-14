import React from "react";
import axios from "axios";
import {Table, Pagination} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./menu";


class Devices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            currentPage: 1,
            pageCount: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1/devices')
            .then(response => {
                this.setState({
                    cars: response.data,
                    pageCount: Math.ceil(response.data.length / 12)
                })
            }).catch(error => {
            console.error(error);
        });
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
            <div>
                <Menu/>
                <div className={"d-flex justify-content-center align-items-center"} style={{height: "100vh"}}>
                    <div style={{width: "65%"}}>
                        {this.state.cars.length > 0 &&
                            <Table responsive={true} striped bordered hover>
                                <thead>
                                <tr>
                                    <th>DeviceID</th>
                                    <th>Vehicle Make</th>
                                    <th>Vehicle Model</th>
                                    <th>Phone number</th>
                                    <th>Equipment Type</th>
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
            </div>
        )
    }
}

export default Devices