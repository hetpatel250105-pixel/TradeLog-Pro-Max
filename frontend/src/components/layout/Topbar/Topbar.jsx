import { useState, useEffect } from "react";

import { FaMoon, FaSun } from "react-icons/fa";

import "./Topbar.css";

import TradeModal from "../../modals/TradeModal/TradeModal";

function Topbar() {

    const [openModal, setOpenModal] = useState(false);

    const [darkMode, setDarkMode] = useState(true);

    // Get username from localStorage
    const username = localStorage.getItem("username") || "User";

    // First letter in uppercase
    const firstLetter = username.charAt(0).toUpperCase();

    useEffect(() => {

        document.documentElement.setAttribute("data-theme", "dark");

    }, []);

    function toggleTheme() {

        const root = document.documentElement;

        if (darkMode) {

            root.setAttribute("data-theme", "light");

        }

        else {

            root.setAttribute("data-theme", "dark");

        }

        setDarkMode(!darkMode);

    }

    return (

        <>

            <header className="topbar">

                <div className="topbar-left">

                    <h1>

                        Welcome Back 👋

                    </h1>

                    <p>

                        Here's an overview of your trading performance.

                    </p>

                </div>

                <div className="topbar-right">

                    <button
                        className="add-trade-btn"
                        onClick={() => setOpenModal(true)}
                    >

                        + Add Trade

                    </button>

                    <button
                        className="theme-btn"
                        onClick={toggleTheme}
                    >

                        {
                            darkMode
                                ? <FaSun />
                                : <FaMoon />
                        }

                    </button>

                    <div className="user-profile">

                        <div className="user-avatar">

                            {firstLetter}

                        </div>

                        <div className="user-details">

                            <h4>

                                {username}

                            </h4>

                            <p>

                                Professional Trader

                            </p>

                        </div>

                    </div>

                </div>

            </header>

            <TradeModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

        </>

    );

}

export default Topbar;