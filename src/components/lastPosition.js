import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";
import Menu from "./menu";

class LastPosition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: {},
            date: "",
            cars: [],
            selectedCar: "",
            odometer: "",
            lng: 0,
            lat: 0,
            address: "",
            found: false,
            show: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1/devices')
            .then(response => {
                this.setState({
                    cars: response.data
                })
            }).catch(error => {
            console.error(error);
        })
    }

    handleCarChange = (e) => {
        this.setState({
            selectedCar: e.target.value
        })
    }
    timeStampToDate = (timestamp) => {
        const date = new Date(timestamp * 1000);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    sendNew = () => {
        axios({
            url: 'http://localhost:8080/api/v1/device',
            method: 'get',
            params: {
                deviceID: this.state.selectedCar
            }
        }).then(res => {
            console.log(res)
            this.setState({
                lng: res.data.lastvalidlongitude,
                lat: res.data.lastvalidlatitude,
                odometer: res.data.lastOdometerKM,
                address: res.data.address,
                found: true
            })
            this.setState(({
                coordinates: {
                    lng: res.data.lastvalidlongitude,
                    lat: res.data.lastvalidlatitude
                }
            }))
            const date = this.timeStampToDate(res.data.lastGPSTimestamp)
            this.setState({
                date: date
            })
        }).catch(err => {
            console.log(err)
        })
    }
    center = {
        lat: 51.129313,
        lng: 71.439246
    };
    containerStyle = {
        width: '100%',
        height: '100%'
    };
    handleClose = () => {
        this.setState({
            show: false,
        })
    }
    handleShow = () => {
        this.setState({
            show: true
        })
    }

    render() {
        return (
            <div>
                <Menu/>
                <div style={{height: "100vh"}} className={"d-flex align-items-center"}>
                    <div className={"p-2 d-flex w-100 border border-2"} style={{height: "80vh"}}>
                        <div className={"w-25 d-flex align-items-start flex-column"}>
                            <Form className={"mb-auto w-100"}>
                                <Form.Select onClick={this.handleCarChange}>
                                    {
                                        this.state.cars.map(car => (
                                            <option>{car.deviceID}</option>
                                        ))
                                    }
                                </Form.Select>
                                <Button variant={"outline-primary"} onClick={this.sendNew} className={"mt-2 w-100"}
                                        disabled={this.state.selectedCar === ""}>Show last position
                                </Button>
                            </Form>
                            {
                                !this.state.found ? (
                                    <div className={"badge bg-primary text-wrap p-3 mt-2 w-100"}>Choose the car
                                    </div>
                                ) : (
                                    <Button variant={"outline-primary"} onClick={this.handleShow}
                                            className={"mt-2 w-100"}>Show details
                                    </Button>
                                )
                            }
                        </div>
                        {
                            Object.keys(this.state.coordinates).length > 0 && (
                                <LoadScript
                                    googleMapsApiKey="AIzaSyAkvV72uGI04gRtFVa15c5cIgZw8dfAMs4"
                                >
                                    <GoogleMap
                                        center={this.center}
                                        zoom={9}
                                        mapContainerStyle={this.containerStyle}
                                    >
                                        <MarkerF position={this.state.coordinates}/>
                                    </GoogleMap>
                                </LoadScript>
                            )
                        }
                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Last position details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.selectedCar !== "" && (
                                <div>Selected car {this.state.selectedCar}</div>
                            )
                        }
                        {
                            this.state.date !== "" && (
                                <div>The date {this.state.date}</div>
                            )
                        }
                        {
                            this.state.address !== "" && (
                                <div>The address {this.state.address}</div>
                            )
                        }
                        {
                            this.state.odometer !== "" && (
                                <div>The odometer {this.state.odometer}</div>
                            )
                        }
                        {
                            this.state.lng !== "" && (
                                <div>The last longitude {this.state.lng}</div>
                            )
                        }
                        {
                            this.state.lat !== "" && (
                                <div>The last latitude {this.state.lat}</div>
                            )
                        }
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default LastPosition