import React from "react";
import {NavLink} from "react-router-dom";
import {
    FaUsers, FaRoute, FaCar
} from "react-icons/fa";
import {BiLogOut, BiMap} from "react-icons/bi";
import {AiOutlineUserAdd} from "react-icons/ai"
import {TbMapPins, TbReportSearch} from "react-icons/tb"


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            isAdmin: false,
            menuItem: [
                {
                    path: "/reports",
                    name: "Reports",
                    icon: <TbReportSearch/>
                },
                {
                    path: "/devicegroup",
                    name: "Group device",
                    icon: <TbMapPins/>
                },
                {
                    path: "/users",
                    name: "Users",
                    icon: <FaUsers/>
                },
                {
                    path: "/routesMap",
                    name: "Routes history",
                    icon: <FaRoute/>
                },
                {
                    path: "/lastPosition",
                    name: "Last position",
                    icon: <BiMap/>
                },
                {
                    path: "/devices",
                    name: "Devices",
                    icon: <FaCar/>
                },
                {
                    path: "/register",
                    name: "Add user",
                    icon: <AiOutlineUserAdd/>
                },
                {
                    path: "/",
                    name: "Log out",
                    icon: <BiLogOut/>
                },
            ]
        };
    }

    componentDidMount() {
        const curUser = localStorage.getItem("user")
        if (curUser === null) window.location.href = "http://localhost:3000/"
        const parsed = JSON.parse(curUser)
        this.setState({
            user: parsed.sub
        })
        if (parsed.roles.includes('ROLE_USER')) {
            this.setState({
                menuItem: [
                    {
                        path: "/reports",
                        name: "Reports",
                        icon: <TbReportSearch/>
                    },
                    {
                        path: "/routesMap",
                        name: "Routes history",
                        icon: <FaRoute/>
                    },
                    {
                        path: "/lastPosition",
                        name: "Last position",
                        icon: <BiMap/>
                    },
                    {
                        path: "/devices",
                        name: "Devices",
                        icon: <FaCar/>
                    },
                    {
                        path: "/",
                        name: "Log out",
                        icon: <BiLogOut/>
                    },
                ]
            })
        }
    }


    render() {
        return (
            <div className={"con"}>
                <div className="sidebar">
                    <div className="top_section">
                        <h1 className="logo">VTS</h1>
                    </div>
                    {
                        this.state.menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className="link">
                                <div className={"icon-wrapper"}>
                                    <div className="icon">{item.icon}</div>
                                    <div className="link_text">{item.name}</div>
                                </div>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard