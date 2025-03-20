import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import PeopleList from "./components/People_list";
import FriendsNew from "./components/Friends";

function App() {
    return (
        <Router>
            
            <div className="p-4">
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/Friends" element={<FriendsNew />} />
                    <Route path="/peoplelist" element={<PeopleList />} />
                    <Route path="/profile/:userId" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
