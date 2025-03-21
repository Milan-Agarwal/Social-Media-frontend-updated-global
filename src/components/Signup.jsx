import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";
import styled from 'styled-components';

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); // New state for success message
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://social-media-backend-5qs2.onrender.com/signup", formData);
            setSuccess(response.data.message); // Set success message from server response
            setError(""); // Clear any previous error
            setTimeout(() => navigate("/login"), 2000); // Delay navigation by 2 seconds
        } catch (err) {
            setSuccess(""); // Clear any previous success message
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
        <>
        

        
         <StyledWrapper>
         <div className="container">
           <div className="heading">Sign In</div>
           <form className="form" onSubmit={handleSubmit}>
             <input
               required
               className="input"
               type="text"
               name="username"
               placeholder="Username"
               onChange={handleChange}
             />
             {error === "This username is already taken. Please choose another one." && (
               <p className="error-message">This username is already taken. Please choose another one.</p>
             )}
             <input
               required
               className="input"
               type="email"
               name="email"
               placeholder="E-mail"
               onChange={handleChange}
             />
             {error === "This email is already registered. Please use another email." && (
               <p className="error-message">This email is already registered. Please use another email.</p>
             )}
             <input
               required
               className="input"
               type="password"
               name="password"
               placeholder="Password"
               onChange={handleChange}
             />
             <input className="login-button" type="submit" value="Sign In" />
           </form>
           {success && <p className="success-message">{success}</p>} {/* Display success message */}
           <p className="login-redirect">
             Already have an account? <Link to="/login">Login</Link>
           </p>
         </div>
       </StyledWrapper>
       </>
    );
};
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;

  .container {
    max-width: 450px;
    background: #F8F9FD;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
    border-radius: 40px;
    padding: 35px 45px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 20px;
    transform: scale(1.1);
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 35px;
    color: rgb(16, 137, 211);
  }

  .form {
    margin-top: 25px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 18px 22px;
    border-radius: 20px;
    margin-top: 20px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #12B1D1;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
    color: white;
    padding-block: 18px;
    margin: 25px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }

  .login-redirect {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #333;
  }

  .login-redirect a {
    color: #0099ff;
    text-decoration: none;
  }

  .login-redirect a:hover {
    text-decoration: underline;
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }

  .success-message {
    color: green;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
  }
`;

export default Signup;
