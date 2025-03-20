import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./profile.css"; // Add CSS for styling
import defaultProfilePic from "../assets/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";  // Adjust path if needed
import Navbar from "./Navbar";
import styled from 'styled-components';

const Profile = () => {
    const { userId } = useParams(); // Get userId from the URL
    const loggedUserId = localStorage.getItem("userId"); // Get logged-in user ID
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const profilePictureInputRef = useRef(null); // Ref for profile picture input

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`https://social-media-backend-5qs2.onrender.com/user/${userId}`);
                setUser(res.data);
            } catch (err) {
                console.error("Error fetching user profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleImageUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "first_time"); // Replace with your Cloudinary upload preset

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/den7f7mna/image/upload", // Replace with your Cloudinary cloud name
                formData
            );
            return res.data.secure_url; // Return the uploaded image URL
        } catch (err) {
            console.error("Error uploading image:", err);
            return null;
        }
    };

    const handleProfilePictureUpdate = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadedImageUrl = await handleImageUpload(file); // Upload image to Cloudinary
        if (!uploadedImageUrl) {
            console.error("Profile picture upload failed");
            return;
        }

        try {
            const res = await axios.put(`https://social-media-backend-5qs2.onrender.com/users/${userId}/profile-picture`, {
                profilePicture: uploadedImageUrl,
            });
            setUser({ ...user, profilePicture: uploadedImageUrl }); // Update the user state with the new profile picture
            console.log("Profile picture updated successfully:", res.data);

            // Clear the file input
            if (profilePictureInputRef.current) {
                profilePictureInputRef.current.value = "";
            }
        } catch (err) {
            console.error("Error updating profile picture:", err);
        }
    };

    if (loading) {
        return <p className="loading-message">Loading...</p>;
    }

    if (!user) {
        return <p className="error-message">User not found.</p>;
    }

    return (
        <>
        <Navbar />
        <StyledWrapper>
            <div className="card">
                <div className="card__content">
                    <div className="user-profile-container">
                        <div className="user-profile-header">
                            <h2>{user.username}'s Profile</h2>
                            <Link to="/Feed" className="user-back-link">Back to Feed</Link>
                        </div>
                        <div className="user-profile-details">
                            <img
                                src={user.profilePicture || defaultProfilePic}
                                alt={`${user.username}'s profile`}
                                className="user-profile-picture"
                                loading="lazy"
                            />
                            {loggedUserId === userId && (
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}> {/* Align title and input */}
                                    <p style={{ fontSize: "14px", margin: 0 }}><strong>Change Profile Picture:</strong></p> {/* Smaller and aligned */}
                                    <input
                                        type="file"
                                        ref={profilePictureInputRef}
                                        onChange={handleProfilePictureUpdate}
                                        accept="image/*"
                                    />
                                </div>
                            )}
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Friends:</strong> {user.friends?.length || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
        </>
    );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px); /* Adjust height to account for the navbar height */
  margin-top: 64px; /* Add margin to push the card below the navbar */

  .card {
    width: 400px; /* Increased width */
    height: auto; /* Adjust height to fit content */
    border-radius: 20px;
    padding: 20px; /* Increased padding for better spacing */
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center; /* Center align text */
  }

  .card__content {
    background: rgb(5, 6, 45);
    border-radius: 17px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center; /* Center align text */
  }

  .user-profile-picture {
    display: block;
    margin: 0 auto; /* Center the image horizontally */
    border-radius: 50%; /* Make the image circular */
    width: 150px; /* Set a fixed width */
    height: 150px; /* Set a fixed height */
    object-fit: cover; /* Ensure the image fits within the circle */
  }
`;

export default Profile;