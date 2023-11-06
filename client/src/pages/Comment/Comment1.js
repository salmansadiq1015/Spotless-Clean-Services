import React, { useEffect, useState } from "react";
import "./comment.css";
import { BiSolidCommentDetail } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Comment1() {
  const [data, setData] = useState([]);
  const [comment3, setComment3] = useState([]);
  const navigate = useNavigate();

  const getComment = async () => {
    try {
      const { data } = await axios.get(`/api/v1/comment/get-comment`);
      setData(data?.comments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComment();
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      setComment3(data.slice(0, 3));
    }
  }, [data]);
  return (
    <div className="comment1-wrapper">
      <div className="comment1-content">
        <h1>Hear From Our Clients</h1>
        <div className="comments1">
          {comment3?.map((c) => (
            <div className="comment1-box" key={c?._id}>
              <div className="comment1-icon">
                <BiSolidCommentDetail />
              </div>
              <p>"{c?.comment}"</p>
              <h3>{c?.user}</h3>
            </div>
          ))}
        </div>
        <div className="comment1-more-btn">
          <button onClick={() => navigate("/reviews")}>Read more review</button>
        </div>
      </div>
    </div>
  );
}
