import React, { useEffect, useState } from "react";
import "./slider.css";
import { BsArrowRightCircleFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const [blog, setBlog] = useState([]);
  const [blogs3, setBlogs3] = useState([]);
  const navigate = useNavigate();

  // getBlog-Data
  const getBlog = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blogs/get-blog`);
      setBlog(data?.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  useEffect(() => {
    if (blog.length > 0) {
      setBlogs3(blog.slice(0, 3));
    }
  }, [blog]);
  return (
    <div className="home-blog-wrapper">
      <h1 className="text-green-800 font-bold text-2xl md:text-5xl">
        Practically Spotless Blog
      </h1>
      <div className="home-blog-container ">
        {blogs3.map((b) => (
          <div className="blog-box" key={b._id}>
            <div className="image">
              <img src={`/api/v1/blogs/banner-image/${b._id}`} alt="" />
            </div>
            <div className="home-blog-content">
              <h3>{b?.title}</h3>
              <p>{b?.shotDesc.slice(0, 100)}...</p>
              <div
                className="read-more-btn"
                onClick={() => navigate(`/blogs/detail/${b._id}`)}
              >
                <BsArrowRightCircleFill /> Read More
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn "
        style={{
          width: "10rem",
          fontSize: "1rem",
          fontWeight: "600",
          margin: "auto",
          color: "#fff",
        }}
        onClick={() => navigate("/blogs")}
      >
        Visit Our Blogs
      </button>
    </div>
  );
}
