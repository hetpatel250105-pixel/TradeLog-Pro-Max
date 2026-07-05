import { NavLink, useNavigate } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

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

    function handleLogout() {

        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        // Remove JWT and user information
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");

        // Go back to login page
        window.location.href = "/";

    }

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

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    🚪 Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;