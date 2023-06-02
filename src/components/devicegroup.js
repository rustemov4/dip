import React from "react";
import Dashboard from "./sidemenu";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";

class Devicegroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceGroups: [],
            selectedGroup: "",
            selectedDeviceGroup: []
        }
    }

    componentDidMount() {
        const curUser = localStorage.getItem("user")
        if (curUser === null) window.location.href = "http://localhost:3000/"
        axios.get('http://localhost:8080/api/v1/deviceGroups')
            .then(response => {
                this.setState({
                    deviceGroups: response.data
                })
            }).catch(error => {
            console.error(error);
        })
    }

    showDevices = () => {
        const deviceGroup = this.state.deviceGroups.find(x => x.displayname === this.state.selectedGroup)
        axios.get('http://localhost:8080/api/v1/device_by_groupID', {
            params: {
                groupID: deviceGroup.groupID
            }
        })
            .then(response => {
                this.setState({
                    selectedDeviceGroup: response.data
                })
                console.log(response.data)
            }).catch(error => {
            console.error(error);
        })
    }
    handleDeviceChange = (e) => {
        this.setState({
            selectedGroup: e.target.value
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
    render() {
        return (
            <div className={"d-flex"}>
                <Dashboard/>
                <div style={{height: "100vh"}} className={"d-flex align-items-center w-100 p-5"}>
                    <div className={"p-2 d-flex w-100 border border-2 shadow-lg rounded bg-light"}
                         style={{height: "80vh"}}>
                        <div className={"w-25 d-flex align-items-start flex-column"}>
                            <Form className={"mb-auto w-100"}>
                                <Form.Select onClick={this.handleDeviceChange}>
                                    {
                                        this.state.deviceGroups.map(deviceGroup => (
                                            <option>{deviceGroup.displayname}</option>
                                        ))
                                    }
                                </Form.Select>
                                <Button variant={"outline-primary"} onClick={this.showDevices} className={"mt-2 w-100"}
                                        disabled={this.state.selectedGroup === ""}>Show device groups
                                </Button>
                            </Form>
                            <div className={"badge bg-primary text-wrap p-3 mt-2 w-100"}>Choose the region</div>
                        </div>
                        {
                            this.state.selectedDeviceGroup.length > 0 && (
                                <LoadScript
                                    googleMapsApiKey="AIzaSyAkvV72uGI04gRtFVa15c5cIgZw8dfAMs4"
                                >
                                    <GoogleMap
                                        center={this.center}
                                        zoom={9}
                                        mapContainerStyle={this.containerStyle}
                                    >
                                        {
                                            this.state.selectedDeviceGroup.map(val => (
                                                <MarkerF position={{
                                                    lng: val.lastvalidlongitude,
                                                    lat: val.lastvalidlatitude
                                                }}/>
                                            ))
                                        }
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

export default Devicegroup