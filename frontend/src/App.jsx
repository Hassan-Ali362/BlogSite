import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home"; 
import Post from "./Pages/Post";
import Explore from "./Pages/Explore";
import PostShowPage from "./Pages/PostShowPage";
import PostsByUser from "./Pages/PostsByUser";
import { ToastContainer } from "react-toastify";
import EditPost from "./Pages/EditPost";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Comments from "./Pages/Comments";
import UploadImage from "./Pages/UploadImage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/postshow/:id" element={<PostShowPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-posts" element={<PostsByUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comment" element={<Comments />} />
        <Route path="/editpost/:id" element={<EditPost />} />
        <Route path="/uploadImage" element={<UploadImage />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={800} />

    </BrowserRouter>
  );
}

export default App;
