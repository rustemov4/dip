import React from "react";
import {Button, Form} from "react-bootstrap";
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
    send = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/v1/latestPosition',
            params: {
                deviceID: this.state.selectedCar
            }
        }).then(res => {
            this.setState({
                coordinates: {
                    lng: res.data.longitude,
                    lat: res.data.latitude
                },
            })
            const date = this.timeStampToDate(res.data.timestamp)
            console.log(res.data.timestamp)
            console.log(date)
            this.setState({
                date: date
            })
        })
    }
    timeStampToDate = (timestamp) => {
        const date = new Date(timestamp * 1000);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    center = {
        lat: 51.129313,
        lng: 71.439246
    };
    containerStyle = {
        width: '100%',
        height: '100%'
    };

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
                                <Button variant={"outline-primary"} onClick={this.send} className={"mt-2 w-100"}
                                        disabled={this.state.selectedCar === ""}>Show last position
                                </Button>
                            </Form>
                            <div className={"badge bg-primary text-wrap p-3 mt-2 w-100"}>Last position for the
                                date: {this.state.date}
                            </div>
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
            </div>
        )
    }
}

export default LastPosition