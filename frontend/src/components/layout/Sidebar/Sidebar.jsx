import { NavLink } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {

    const menuItems = [

        {
            title: "Dashboard",
            path: "/dashboard",
            icon: "🏠"
        },

        {
            title: "Trades",
            path: "/trades",
            icon: "📈"
        },

        {
            title: "Analytics",
            path: "/analytics",
            icon: "📊"
        },

        {
            title: "Journal",
            path: "/journal",
            icon: "📖"
        },

        {
            title: "Calendar",
            path: "/calendar",
            icon: "📅"
        },

        {
            title: "Settings",
            path: "/settings",
            icon: "⚙️"
        }

    ];

    return (

        <aside className="sidebar">

            <div className="sidebar-top">

                <div className="logo">

                    <div className="logo-icon">

                        📈

                    </div>

                    <div>

                        <h2>

                            TradeLog

                        </h2>

                        <p>

                            Pro Max

                        </p>

                    </div>

                </div>

                <nav className="sidebar-nav">

                    {

                        menuItems.map((item) => (

                            <NavLink

                                key={item.title}

                                to={item.path}

                                className={({ isActive }) =>

                                    isActive

                                        ? "sidebar-link active"

                                        : "sidebar-link"

                                }

                            >

                                <span className="sidebar-icon">

                                    {item.icon}

                                </span>

                                <span>

                                    {item.title}

                                </span>

                            </NavLink>

                        ))

                    }

                </nav>

            </div>

            <div className="sidebar-bottom">

                <button className="logout-btn">

                    🚪 Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;