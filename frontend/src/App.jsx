import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {

    const token = localStorage.getItem("access_token");

    return (

        <Routes>

            {/* Login */}

            <Route
                path="/"
                element={
                    token
                        ? <Navigate to="/dashboard" />
                        : <Login />
                }
            />

            {/* Register */}

            <Route
                path="/register"
                element={
                    token
                        ? <Navigate to="/dashboard" />
                        : <Register />
                }
            />

            {/* Dashboard */}

            <Route
                path="/dashboard"
                element={
                    token
                        ? <Dashboard />
                        : <Navigate to="/" />
                }
            />

            {/* Catch all */}

            <Route
                path="*"
                element={
                    <Navigate to={token ? "/dashboard" : "/"} />
                }
            />

        </Routes>

    );

}

export default App;