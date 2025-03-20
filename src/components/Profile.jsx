import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./profile.css"; // Add CSS for styling
import defaultProfilePic from "../assets/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";  // Adjust path if needed
import Navbar from "./Navbar";

const Profile = () => {
    const { userId } = useParams(); // Get userId from the URL
    // const userId = localStorage.getItem("userId");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/user/${userId}`);
                setUser(res.data);
            } catch (err) {
                console.error("Error fetching user profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (loading) {
        return <p className="loading-message">Loading...</p>;
    }

    if (!user) {
        return <p className="error-message">User not found.</p>;
    }

    return (
        <>
        <Navbar />
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
                />
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Friends:</strong> {user.friends?.length || 0}</p>
            </div>
        </div>
        </>
    );
};

export default Profile;