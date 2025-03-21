import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import styled from 'styled-components';
const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); // State for success message
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://social-media-backend-5qs2.onrender.com/login", formData);
            localStorage.setItem("token", res.data.token); // Store token
            localStorage.setItem("userId", res.data.user._id); // Store userid data
            localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user data
            setSuccess("Login successful! Redirecting to feed..."); // Set success message
            setError(""); // Clear any previous error
            setTimeout(() => navigate("/Feed"), 2000); // Redirect after 2 seconds
        } catch (err) { 
            setError(err.response?.data?.error || "Invalid Credentials");
            setSuccess(""); // Clear success message
        }
    };

    return (
        <>
        <StyledWrapper>
      <form className="form_main" onSubmit={handleSubmit}>
        <p className="heading">Login</p>
        <div className="inputContainer">
          <svg viewBox="0 0 16 16" fill="#2e2e2e" height={16} width={16} xmlns="http://www.w3.org/2000/svg" className="inputIcon">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
          </svg>
          <input 
            placeholder="Email" 
            id="username" 
            className="inputField" 
            type="email" 
            name="email" 
            onChange={handleChange} 
          />
        </div>
        <div className="inputContainer">
          <svg viewBox="0 0 16 16" fill="#2e2e2e" height={16} width={16} xmlns="http://www.w3.org/2000/svg" className="inputIcon">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          </svg>
          <input 
            placeholder="Password" 
            id="password" 
            className="inputField" 
            type="password" 
            name="password" 
            onChange={handleChange} 
          />
        </div>
        <button id="button" type="submit">Submit</button>
        {error && <p className="errorMessage">{error}</p>} {/* Display error message */}
        {success && <p className="successMessage">{success}</p>} {/* Display success message */}
        <div className="signupContainer">
          <p>Don't have any account?</p>
          <Link to="/">Sign up</Link> {/* Updated to use Link for navigation */}
        </div>
      </form>
    </StyledWrapper>

        </>
    );
};
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height for centering */

  .form_main {
    width: 400px; /* Increased size */
    padding: 40px; /* Adjust padding for larger form */
    border-radius: 30px;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.062);
  }

  .heading {
    font-size: 3em; /* Slightly larger heading */
    color: #2e2e2e;
    font-weight: 700;
    margin: 15px 0 30px 0;
  }

  .inputContainer {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inputIcon {
    position: absolute;
    left: 10px;
  }

  .inputField {
    width: 100%;
    height: 50px; /* Increased input height */
    background-color: transparent;
    border: none;
    border-bottom: 2px solid rgb(173, 173, 173);
    border-radius: 30px;
    margin: 10px 0;
    color: black;
    font-size: 1em; /* Larger font size */
    font-weight: 500;
    box-sizing: border-box;
    padding-left: 30px;
  }

  .inputField:focus {
    outline: none;
    border-bottom: 2px solid rgb(199, 114, 255);
  }

  .inputField::placeholder {
    color: rgb(80, 80, 80);
    font-size: 1em;
    font-weight: 500;
  }

  #button {
    position: relative;
    width: 100%;
    border: 2px solid #8000ff;
    background-color: #8000ff;
    height: 50px; /* Increased button height */
    color: white;
    font-size: 1em; /* Larger font size */
    font-weight: 500;
    letter-spacing: 1px;
    border-radius: 30px;
    margin: 10px;
    cursor: pointer;
    overflow: hidden;
    transition: background-color 0.3s ease; /* Smooth transition for color change */
  }

  #button:active {
    background-color: #5a00b3; /* Darker shade of purple */
    border-color: #5a00b3;
  }

  #button::after {
    content: "";
    position: absolute;
    background-color: rgba(255, 255, 255, 0.253);
    height: 100%;
    width: 150px;
    top: 0;
    left: -200px;
    border-bottom-right-radius: 100px;
    border-top-left-radius: 100px;
    filter: blur(10px);
    transition-duration: .5s;
  }

  #button:hover::after {
    transform: translateX(600px);
    transition-duration: .5s;
  }

  .signupContainer {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .signupContainer p {
    font-size: .9em;
    font-weight: 500;
    color: black;
  }

  .signupContainer a {
    font-size: .7em;
    font-weight: 500;
    background-color: #2e2e2e;
    color: white;
    text-decoration: none;
    padding: 8px 15px;
    border-radius: 20px;
  }

  .errorMessage {
    color: red;
    font-size: 0.9em;
    margin-top: 10px;
    text-align: center;
  }

  .successMessage {
    color: green;
    font-size: 0.9em;
    margin-top: 10px;
    text-align: center;
  }
`;

export default Login;
