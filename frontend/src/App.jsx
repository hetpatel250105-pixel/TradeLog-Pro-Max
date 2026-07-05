import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {

    const userId = localStorage.getItem("user_id");

    return (

        <Routes>

            {/* Login */}

            <Route

                path="/"

                element={

                    userId

                        ? <Navigate to="/dashboard" />

                        : <Login />

                }

            />

            {/* Register */}

            <Route

                path="/register"

                element={

                    userId

                        ? <Navigate to="/dashboard" />

                        : <Register />

                }

            />

            {/* Dashboard */}

            <Route

                path="/dashboard"

                element={

                    userId

                        ? <Dashboard />

                        : <Navigate to="/" />

                }

            />

            {/* Catch all invalid routes */}

            <Route

                path="*"

                element={

                    <Navigate to={userId ? "/dashboard" : "/"} />

                }

            />

        </Routes>

    );

}

export default App;