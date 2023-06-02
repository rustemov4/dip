import React from "react";
import Dashboard from "./sidemenu";
import {Button, Form, Table} from "react-bootstrap";
import axios from "axios";

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            from: 0,
            to: 0,
            selectedCar: "",
            speed: 60,
            res: []
        }
    }

    componentDidMount() {
        const curUser = localStorage.getItem("user")
        if (curUser === null) window.location.href = "http://localhost:3000/"
        const parsed = JSON.parse(curUser)
        axios.get('http://localhost:8080/api/v1/devices', {
            params: {
                accountID: parsed.sub
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

    handleFromChange = (e) => {
        this.setState({
            from: e.target.value
        })
    }
    handleToChange = (e) => {
        this.setState({
            to: e.target.value
        })
    }
    handleCarChange = (e) => {
        this.setState({
            selectedCar: e.target.value
        })
    }
    handleSpeedChange = (e) => {
        this.setState({
            speed: parseFloat(e.target.value)
        })
    }
    send = () => {
        const startTimestamp = new Date(this.state.from).getTime() / 1000
        const endTimestamp = new Date(this.state.to).getTime() / 1000
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/v1/report',
            params: {
                deviceID: this.state.selectedCar,
                speed: this.state.speed,
                startTimestamp: startTimestamp,
                endTimestamp: endTimestamp
            }
        }).then(res => {
            this.setState({
                res: res.data
            })
        }).catch(e => {
            console.log(e)
        })
    }

    render() {
        return (
            <div className={"d-flex"}>
                <Dashboard/>
                <div style={{height: "100vh"}} className={"d-flex align-items-center w-100 p-5"}>
                    <div className={"p-2 d-flex w-100 border border-2 shadow-lg rounded bg-light"}
                         style={{height: "80vh"}}>
                        <div className={"w-25 d-flex align-items-start flex-column"}>
                            <Form className={"mb-auto w-100"}>
                                <Form.Select onClick={this.handleCarChange}>
                                    {
                                        this.state.cars.map(car => (
                                            <option>{car.deviceID}</option>
                                        ))
                                    }
                                </Form.Select>
                                <Form.Group>
                                    <Form.Label>From</Form.Label>
                                    <Form.Control type={"date"} onChange={this.handleFromChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type={"date"} onChange={this.handleToChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Speed KPH</Form.Label>
                                    <Form.Control type={"number"} onChange={this.handleSpeedChange}/>
                                </Form.Group>
                                <Button variant={"outline-primary"} className={"mt-2 w-100"} onClick={this.send}>Generate
                                    report</Button>
                            </Form>
                            <div className={"badge bg-primary text-wrap p-3 mt-2 w-100"}>Choose the date</div>
                        </div>
                        <div className={"reports ms-2"}>
                            <Table responsive={true} striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Device</th>
                                    <th>Timestamp</th>
                                    <th>Longitude</th>
                                    <th>Latitude</th>
                                    <th>Speed</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.res.map(val => (
                                        <tr>
                                            <td>{val.deviceID}</td>
                                            <td>{val.timestamp}</td>
                                            <td>{val.longitude}</td>
                                            <td>{val.latitude}</td>
                                            <td>{val.speedKPH}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reports