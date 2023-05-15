import React from "react";
import {NavLink} from "react-router-dom";

class Landing extends React.Component {
    render() {
        return (
            <div>
                <div className={"header"}>
                    <div className={"header_nav"}>
                        <div className={"logo"}>
                            <h2>VTS</h2>
                        </div>
                        <div className={"nav_links"}>
                            <NavLink to={"/routesMap"} className={"link_header text-decoration-none"}>Routes
                                history</NavLink>
                            <NavLink to={"/lastPosition"} className={"link_header ms-3 text-decoration-none"}>Last
                                position </NavLink>
                            <NavLink to={"/devices"}
                                     className={"link_header ms-3 text-decoration-none"}>Devices </NavLink>
                            <NavLink to={"/register"} className={"link_header ms-3 text-decoration-none"}>Register
                                User </NavLink>
                            <NavLink to={"/"} className={"link_header ms-3 text-decoration-none"}>Log out </NavLink>
                        </div>
                        <div className={"burger"}>
                            <h3>Burger</h3>
                        </div>
                    </div>
                    <div className={"header_img_words"}>
                        <div className={"header_words p-5 "}>
                            <div>
                                <h1>Discover the Power of Location</h1>
                                <p>Discover a New Era of Vehicle Tracking: Effortless Navigation, Real-Time Insights,
                                    and Unmatched Security. Streamline Your Fleet Operations and Experience the Power of
                                    Location Intelligence for Optimal Efficiency and Peace of Mind.</p>
                            </div>
                        </div>
                        <img className={"img"} src={require("../image.svg").default}/>
                    </div>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

