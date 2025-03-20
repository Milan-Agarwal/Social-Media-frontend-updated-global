import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./peopleList.css";
import Navbar from "./Navbar";
import defaultProfilePic from "../assets/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";  // Adjust path if needed



const PeopleList = () => {
    const userId = localStorage.getItem("userId");
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState(new Set());
    const navigate = useNavigate(); // Hook for navigation

    // Fetch all users except the logged-in user
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("https://social-media-backend-5qs2.onrender.com/users", {
                    params: { userId }, // Pass the logged-in user's ID as a query parameter
                });
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchUsers();
    }, [userId]);

    // Handle Add Friend
    const handleAddFriend = async (friendId) => {
        try {
            await axios.post("https://social-media-backend-5qs2.onrender.com/add-friend", { userId, friendId });
            setFriends(new Set([...friends, friendId])); // Update UI
        } catch (err) {
            console.error("Error adding friend:", err);
        }
    };

    return (
        <>
        <Navbar />
        <div className="peoplelist-container" style={{ marginTop: "70px" }}>
            <button
                className="peoplelist-go-to-feed-btn"
                onClick={() => navigate("/feed")}
            >
                Go to Feed
            </button>
            <h3>All People</h3>
            <ul className="peoplelist-list">
                {users.map((user) =>
                    user._id !== userId ? (
                        <li key={user._id} className="peoplelist-item">
                            <img
                                src={user.profilePicture || defaultProfilePic} // Use a fallback image
                                alt={`${user.username}'s profile`}
                                className="peoplelist-profile-pic"
                                loading="lazy"
                            />
                            <span>{user.username}</span>
                            <div className="peoplelist-actions">
                                <button
                                    className="peoplelist-add-friend-btn"
                                    onClick={() => handleAddFriend(user._id)}
                                    disabled={friends.has(user._id)}
                                >
                                    {friends.has(user._id) ? "Friend Added" : "Add Friend"}
                                </button>
                                <button
                                    className="peoplelist-view-profile-btn"
                                    onClick={() => navigate(`/profile/${user._id}`)}
                                >
                                    View Profile
                                </button>
                            </div>
                        </li>
                    ) : null
                )}
            </ul>
        </div>
        </>
    );
};

export default PeopleList;