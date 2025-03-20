import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./feed.css"; // Add CSS for styling
import moment from "moment";
import Navbar from "./Navbar";
import styled from 'styled-components';
const Feed = () => {
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState(null); // State for user profile
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null); // File object for the image
    const navigate = useNavigate();
    const profilePictureInputRef = useRef(null); // Ref for profile picture input

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!userId) {
                console.error("User ID is null or undefined");
                return;
            }
            try {
                const res = await axios.get(`http://localhost:5000/user/${userId}`);
                setUser(res.data);
            } catch (err) {
                console.error("Error fetching user profile:", err);
            }
        };

        fetchUserProfile();
    }, [userId]);

    // Fetch posts from the backend
    useEffect(() => {
        axios.get("http://localhost:5000/posts")
            .then((res) => setPosts(res.data))
            .catch((err) => console.log(err));
    }, []);

    // Handle Image Upload to Cloudinary
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

    // Handle Profile Picture Update
    const handleProfilePictureUpdate = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadedImageUrl = await handleImageUpload(file); // Upload image to Cloudinary
        if (!uploadedImageUrl) {
            console.error("Profile picture upload failed");
            return;
        }

        try {
            const res = await axios.put(`http://localhost:5000/users/${userId}/profile-picture`, {
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

    // Handle Creating a Post
    const handleCreatePost = async () => {
        const uploadedImageUrl = await handleImageUpload(image); // Upload image first
        if (!uploadedImageUrl && image) {
            console.error("Image upload failed");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/posts", {
                userId,
                content,
                image: uploadedImageUrl || "", // Use the uploaded image URL
                privacy: "Public"
            });
            setPosts([res.data, ...posts]); // Add new post to state
            setContent(""); // Clear input
            setImage(null); // Clear image
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:5000/posts/${postId}`, { data: { userId } });

            // Remove post from state after deletion
            setPosts(posts.filter((post) => post._id !== postId));
        } catch (err) {
            console.error(err);
        }
    };

    

    const handleLike = async (postId) => {
        try {
            const post = posts.find(post => post._id === postId);
            const isLiked = post.likes.includes(userId);

            const res = await axios.post("http://localhost:5000/post/like", { userId, postId });
            setPosts(posts.map((post) =>
                post._id === postId
                    ? {
                        ...post,
                        likes: isLiked
                            ? post.likes.filter(id => id !== userId) // Remove user from likes
                            : [...post.likes, userId] // Add user to likes
                    }
                    : post
            ));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
<Navbar />
        <div className="feed-container mt-16">
        <StyledWrapper>
            <div className="card">
                <div className="card__content">
                    {user && (
                        <div className="feed-profile-section">
                            <img
                                src={user.profilePicture || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="feed-profile-picture centered-image"
                            />
                            <h3>{user.username}</h3>
                            <p>{user.email}</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureUpdate}
                                className="feed-upload-profile-picture"
                                ref={profilePictureInputRef}
                            />
                            <button
                                className="feed-view-profile-button"
                                onClick={() => navigate(`/profile/${userId}`)}
                            >
                                View My Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </StyledWrapper>
            <div className="feed-main">
                <div className="feed-header">
                    <h2>Feed</h2>
                    
                </div>

                {/* Create Post Section */}
                <div className="feed-create-post">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                    />
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])} // Set the selected file
                        accept="image/*"
                    />
                    <button onClick={handleCreatePost}>Post</button>
                </div>

                {/* Display Posts */}
                {posts.map((post) => {
                    const isLiked = post.likes.includes(userId); // Check if the user liked the post
                    const isOwner = post.userId?._id === userId; // Check if logged-in user is the owner
                    const formattedDate = moment(post.createdAt).format("MMMM Do YYYY, h:mm A"); // Format Date

                    return (
                        <div key={post._id} className="feed-post">
                            <h4>Username:{post.userId?.username || "Unknown User"}</h4>
                            <p>Post:{post.content}</p>
                            <p className="feed-post-date">Posted on: {formattedDate}</p>
                            {post.image && <img src={post.image} alt="Post" className="feed-post-image" />}
                            <button
                                className={isLiked ? "feed-liked" : "feed-not-liked"} // Add "feed-not-liked" class
                                onClick={() => handleLike(post._id)}
                            >
                                {isLiked ? `Liked (${post.likes.length})` : `Like (${post.likes.length})`}
                            </button>
                            {isOwner && (
                                <button className="feed-delete-button" onClick={() => handleDelete(post._id)}>
                                    🗑 Delete
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
};
const StyledWrapper = styled.div`
  .card {
    width: 190px;
    height: 254px;
    border-radius: 20px;
    padding: 5px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
  }

  .card__content {
    background: rgb(5, 6, 45);
    border-radius: 17px;
    width: 100%;
    height: 100%;
    color: white; /* Default text color */
  }

  .feed-profile-section h3, 
  .feed-profile-section p, 
  .feed-upload-profile-picture {
    color: white; /* Set text color to white */
  }
`;

export default Feed;