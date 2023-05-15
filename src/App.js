import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RoutesMap from "./components/routesmap";
import Devices from "./components/devices";
import LastPosition from "./components/lastPosition";
import Login from "./components/login";
import Register from "./components/register";
import Landing from "./components/landing";


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
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }

}

export default App;
