import React, { useState } from "react";
import "./Comment.css";
import { useAuth } from "../../context/Auths";
import axios from "axios";
import { toast } from "react-toastify";
import { BiSolidStar } from "react-icons/bi";
import { FiStar } from "react-icons/fi";

const Star = ({ selected, onClick }) => {
  return selected ? (
    <BiSolidStar onClick={onClick} size={26} color="red" />
  ) : (
    <FiStar onClick={onClick} size={26} color="red" />
  );
};
export default function Comment({ setShow }) {
  const [auth] = useAuth();
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const userId = auth?.user.id;

  const handleStarClick = (starCount) => {
    setStars(starCount);
  };

  const renderStars = () => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <Star
          key={i}
          selected={i <= stars}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return starArray;
  };

  //   Post Comment

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/comment/create-comment`,
        {
          comment,
          stars,
          userId,
        }
      );
      if (data?.success) {
        toast.success("Comment added successfully!", {
          theme: "dark",
          position: "top-center",
        });
        setComment("");
        setStars("");
        setShow(false);
      } else {
        toast.error(data?.message, {
          theme: "colored",
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        theme: "colored",
        position: "top-center",
      });
    }
  };
  return (
    <div className="comment-wrapper">
      <div className="comment-content">
        <h2>Write your comment</h2>
        <form onSubmit={postComment}>
          <textarea
            type="text"
            placeholder="Write comment..."
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="star-rating flex items-center gap-2">
            {renderStars()}
          </div>
          <div className="commentbtn">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}
