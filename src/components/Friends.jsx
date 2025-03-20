import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Friends.css"; // Import the new CSS file
import Navbar from "./Navbar";
import defaultProfilePic from "../assets/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";  // Adjust path if needed
const FriendsNew = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/user/${userId}/friends`);
                setFriends(res.data);
            } catch (err) {
                console.error("Error fetching friends:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [userId]);

    return (
        <>
        <Navbar />
        <div className="friends-container" style={{ marginTop: "70px" }}>
            <div className="friends-header">
                <h3>Friends List</h3>
                <Link to="/Feed" className="friends-back-link">Go to Home</Link>
            </div>
            {loading ? (
                <p className="friends-loading-message">Loading...</p>
            ) : friends.length > 0 ? (
                <ul className="friends-list">
                    {friends.map((friend) => (
                        <li key={friend._id} className="friend-item">
                            <div className="friend-info">
                                <img
                                    src={friend.profilePicture || defaultProfilePic} // Use a fallback image
                                    alt={`${friend.username}'s profile`}
                                    className="friend-profile-picture"
                                />
                                <span>{friend.username}</span>
                            </div>
                            <Link to={`/profile/${friend._id}`}>
                                <button className="friends-view-profile-btn">View Profile</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="friends-no-friends-message">No friends yet.</p>
            )}
        </div>
        </>
    );
};

export default FriendsNew;