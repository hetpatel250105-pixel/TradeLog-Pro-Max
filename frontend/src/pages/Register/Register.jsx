import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

import Card from "../../components/ui/Card/Card";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";

import { registerUser } from "../../services/api";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleRegister = async (event) => {

        event.preventDefault();

        setError("");

        if (!username || !email || !password) {

            setError("Please fill in all fields.");

            return;

        }

        try {

            setLoading(true);

            const response = await registerUser({

                username,

                email,

                password

            });

            console.log(response.data);

            navigate("/");

        }

        catch (error) {

            console.error(error);

            setError("Registration failed. Please try again.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-page">

            <div className="register-left">

                <div className="brand">

                    <h1>
                        TradeLog Pro Max
                    </h1>

                    <p>
                        Start your trading journey today.
                        Record every trade, measure your performance,
                        and become a disciplined trader.
                    </p>

                    <ul className="feature-list">

                        <li>📈 Track Every Trade</li>

                        <li>📊 Analyze Performance</li>

                        <li>🎯 Improve Risk Management</li>

                        <li>🏆 Become Consistently Profitable</li>

                    </ul>

                </div>

            </div>

            <div className="register-right">

                <Card className="register-card">

                    <h2>

                        Create Account

                    </h2>

                    <p className="register-subtitle">

                        Join TradeLog Pro Max today.

                    </p>

                    <form onSubmit={handleRegister}>

                        <Input

                            type="text"

                            placeholder="Enter your Username"

                            value={username}

                            onChange={(event) =>
                                setUsername(event.target.value)
                            }

                        />

                        <Input

                            type="email"

                            placeholder="Enter your Email"

                            value={email}

                            onChange={(event) =>
                                setEmail(event.target.value)
                            }

                        />

                        <Input

                            type="password"

                            placeholder="Create Password"

                            value={password}

                            onChange={(event) =>
                                setPassword(event.target.value)
                            }

                        />

                        {

                            error && (

                                <p className="error-message">

                                    {error}

                                </p>

                            )

                        }

                        <Button

                            text={
                                loading
                                    ? "Creating Account..."
                                    : "Create Account"
                            }

                            type="submit"

                            disabled={loading}

                        />

                    </form>

                    <p className="login-link">

                        Already have an account?

                        <Link to="/">

                            Login

                        </Link>

                    </p>

                </Card>

            </div>

        </div>

    );

}

export default Register;