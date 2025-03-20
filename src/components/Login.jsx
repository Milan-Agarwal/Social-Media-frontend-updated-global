import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/login", formData);
            localStorage.setItem("token", res.data.token); // Store token
            localStorage.setItem("userId", res.data.user._id); // Store userid data
            localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user data
            navigate("/Feed"); // Redirect to feed page
        } catch (err) { 
            setError(err.response?.data?.error || "Invalid Credentials");
        }
    };

    return (
        <div className="login-page-container">
            <h2>Login</h2>
            {error && <p className="login-error-message">{error}</p>}
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button onClick={handleSubmit}>Login</button>
            <p>Don't have an account? <Link to="/">Sign up</Link></p>
        </div>
    );
};

export default Login;
