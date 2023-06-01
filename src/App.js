import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import RoutesMap from "./components/routesmap";
import Devices from "./components/devices";
import LastPosition from "./components/lastPosition";
import Login from "./components/login";
import Register from "./components/register";
import Users from "./components/users";

class App extends React.Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/routesMap" element={<RoutesMap/>}/>
                        <Route path="/devices" element={<Devices/>}/>
                        <Route path="/lastPosition" element={<LastPosition/>}/>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path={"/users"} element={<Users/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }

}

export default App;
