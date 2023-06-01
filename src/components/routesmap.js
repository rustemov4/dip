import React from "react";
import axios from "axios";
import {GoogleMap, LoadScript, MarkerF, PolylineF} from "@react-google-maps/api";
import {Button, Form, Modal} from "react-bootstrap";
import Menu from "./menu";
import Dashboard from "./sidemenu";

class RoutesMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: [],
            selectedDate: "",
            selectedStartTime: "",
            selectedEndTime: "",
            selectedCar: "",
            startMarker: {},
            endMarker: {},
            startStreet: "",
            endStreet: "",
            cars: [],
            found: false,
            show: false,
            driver: "",
            city: "",
            country: "",
            postalCode: "",
            speedSum: 0,
            speedNum: 0,
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
                    cars: response.data
                })
            }).catch(error => {
            console.error(error);
        })
    }

    send = () => {
        const curUser = localStorage.getItem("user")

        const parsed = JSON.parse(curUser)
        const start = new Date(`${this.state.selectedDate}T${this.state.selectedStartTime}:00`).getTime() / 1000
        const end = new Date(`${this.state.selectedDate}T${this.state.selectedEndTime}:00`).getTime() / 1000
        console.log(start)
        console.log(end)
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/v1/eventData',
            params: {
                deviceID: this.state.selectedCar,
                startTimestamp: start,
                endTimestamp: end,
                accountID: parsed.sub
            }
        }).then(res => {
            console.log(res.data)
            if (res.data.length === 0) {
                console.log("No route on this day")
                this.setState({
                    found: false
                })
                return
            }
            this.setState({
                path: []
            })
            console.log("Start street", res.data[0].streetaddress)
            console.log("End street", res.data[res.data.length - 1].streetaddress)
            this.setState({
                startMarker: {
                    lng: res.data[0].longitude,
                    lat: res.data[0].latitude
                },
                endMarker: {
                    lng: res.data[res.data.length - 1].longitude,
                    lat: res.data[res.data.length - 1].latitude
                },
                startStreet: res.data[0].streetaddress,
                endStreet: res.data[res.data.length - 1].streetaddress,
                found: true,
                driver: res.data[0].driverID,
                city: res.data[0].city,
                country: res.data[0].country,
                postalCode: res.data[0].postalcode
            })
            let num = 0
            res.data.forEach(coordinates => {
                if (coordinates.longitude === 0 || coordinates.latitude === 0) return
                const newObj = {
                    lng: coordinates.longitude,
                    lat: coordinates.latitude
                }
                this.setState(prevState => ({
                    path: [...prevState.path, newObj]
                }))
                if (coordinates.speedKPH != 0) {
                    this.setState(prevState => ({
                        speedSum: prevState.speedSum + coordinates.speedKPH,
                        speedNum: prevState.speedNum + 1
                    }))
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }
    handleDateChange = (e) => {
        console.log(e.target.value)
        this.setState({
            selectedDate: e.target.value
        })
    }
    handleStartTimeChange = (e) => {
        console.log(e.target.value)
        this.setState({
            selectedStartTime: e.target.value
        })
    }
    handleEndTimeChange = (e) => {
        console.log(e.target.value)
        this.setState({
            selectedEndTime: e.target.value
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
    handleCarChange = (e) => {
        this.setState({
            selectedCar: e.target.value
        })
    }
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
            <div className={"d-flex"}>
                <Dashboard/>
                <div style={{height: "100vh"}}
                     className={"d-flex align-items-center p-5 w-100"}>
                    <div className={"p-2 d-flex w-100 border border-2 shadow-lg rounded bg-light"} style={{height: "80vh"}}>
                        <div className={"w-25 d-flex align-items-start flex-column"}>
                            <Form className={"mb-auto w-100"}>
                                <Form.Group>
                                    <Form.Label>Select the car</Form.Label>
                                    <Form.Select onClick={this.handleCarChange}>
                                        {
                                            this.state.cars.map(car => (
                                                <option>{car.deviceID}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type={"date"} onChange={this.handleDateChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Start time</Form.Label>
                                    <Form.Control type={"time"} onChange={this.handleStartTimeChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>End time</Form.Label>
                                    <Form.Control type={"time"} onChange={this.handleEndTimeChange}/>
                                </Form.Group>
                                <Button variant={"outline-primary"} onClick={this.send} className={"mt-2 w-100"}
                                        disabled={this.state.selectedDate === "" && this.state.selectedStartTime === "" && this.state.selectedEndTime === ""}>Show
                                    route
                                </Button>

                            </Form>
                            {
                                !this.state.found ? (
                                    <div className={"badge bg-primary text-wrap p-3 mt-2 w-100"}>Trip not found
                                    </div>
                                ) : (
                                    <Button variant={"outline-primary"} onClick={this.handleShow}
                                            className={"mt-2 w-100"}>Show details
                                    </Button>
                                )
                            }
                        </div>
                        {
                            this.state.path.length > 0 && (
                                <LoadScript
                                    googleMapsApiKey="AIzaSyAkvV72uGI04gRtFVa15c5cIgZw8dfAMs4"
                                >
                                    <GoogleMap
                                        center={this.center}
                                        zoom={9}
                                        mapContainerStyle={this.containerStyle}
                                    >
                                        <PolylineF

                                            path={this.state.path}
                                            options={{
                                                geodesic: false,
                                                strokeColor: '#FF0000',
                                                strokeOpacity: 1.0,
                                                strokeWeight: 2
                                            }}
                                        />
                                        <MarkerF position={this.state.startMarker}/>
                                        <MarkerF position={this.state.endMarker}/>
                                    </GoogleMap>
                                </LoadScript>
                            )
                        }
                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Route details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.selectedCar !== "" && (<div>
                                Selected car {this.state.selectedCar}
                            </div>)
                        }
                        <div>Start coordinates: {this.state.startMarker.lat}/{this.state.startMarker.lng}</div>
                        <div>End coordinates: {this.state.endMarker.lat}/{this.state.endMarker.lng}</div>
                        {
                            this.state.startStreet !== "" && (<div>
                                Start street {this.state.startStreet}
                            </div>)
                        }
                        {
                            this.state.startStreet !== "" && (<div>
                                End street {this.state.endStreet}
                            </div>)
                        }
                        {
                            this.state.driver !== "" && (
                                <div>
                                    Driver phone {this.state.driver}
                                </div>
                            )
                        }
                        {
                            this.state.city !== "" && (<div>
                                City {this.state.city}
                            </div>)
                        }
                        {
                            this.state.country !== "" && (<div>
                                City {this.state.country}
                            </div>)
                        }
                        {
                            this.state.postalCode !== "" && (<div>
                                City {this.state.postalCode}
                            </div>)
                        }
                        <div>
                            Average speed {this.state.speedSum / this.state.speedNum}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default RoutesMap