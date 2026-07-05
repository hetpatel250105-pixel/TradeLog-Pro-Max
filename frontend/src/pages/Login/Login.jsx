import { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

import Card from "../../components/ui/Card/Card";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";

import { loginUser } from "../../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (event) => {

        event.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {

            setLoading(true);

            const response = await loginUser({
                email,
                password
            });

            console.log("LOGIN RESPONSE:", response.data);

            if (!response.data.user_id) {
                setError("Login failed.");
                return;
            }

            // Save logged-in user
            localStorage.setItem("user_id", String(response.data.user_id));
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("email", response.data.email);

            console.log("Saved user_id:", localStorage.getItem("user_id"));

            // Force reload so TradeContext loads the correct user's trades
            window.location.href = "/dashboard";

        }
        catch (error) {

            console.error(error);

            if (error.response) {
                console.log(error.response.data);
            }

            setError("Invalid email or password.");

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-left">

                <div className="brand">

                    <h1>TradeLog Pro Max</h1>

                    <p>
                        Master Your Trading Journey.
                        Track every trade, analyze every mistake,
                        and become a consistently profitable trader.
                    </p>

                    <ul className="feature-list">
                        <li>📈 Advanced Trade Analytics</li>
                        <li>🎯 Risk Reward Tracking</li>
                        <li>📊 Performance Dashboard</li>
                        <li>🏆 Professional Trading Journal</li>
                    </ul>

                </div>

            </div>

            <div className="login-right">

                <Card className="login-card">

                    <h2>Welcome Back</h2>

                    <p className="login-subtitle">
                        Login to continue your trading journey.
                    </p>

                    <form onSubmit={handleLogin}>

                        <Input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        {error && (
                            <p className="error-message">
                                {error}
                            </p>
                        )}

                        <Button
                            text={loading ? "Logging In..." : "Login"}
                            type="submit"
                            disabled={loading}
                        />

                    </form>

                    <p className="register-link">
                        Don't have an account?
                        <Link to="/register">
                            Register
                        </Link>
                    </p>

                </Card>

            </div>

        </div>

    );

}

export default Login;