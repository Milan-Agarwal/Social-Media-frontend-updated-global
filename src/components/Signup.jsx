import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/signup", formData);
            navigate("/login");
        } catch (err) {
            if (err.response?.status === 400) {
                if (err.response?.data?.error === "Email already registered") {
                    setError("This email is already registered. Please use another email.");
                } else if (err.response?.data?.error === "Username already taken") {
                    setError("This username is already taken. Please choose another one.");
                } else {
                    setError(err.response?.data?.error || "Something went wrong");
                }
            } else {
                setError("Something went wrong");
            }
        }
    };

    return (
        <div className="signup-page-container">
            <h2>Signup</h2>
            {error && <p className="signup-error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button type="submit">Signup</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
