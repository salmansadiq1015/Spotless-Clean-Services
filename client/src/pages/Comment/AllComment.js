import axios from "axios";
import "./comment.css";
import { BsStarFill, BsStar } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";

export default function AllComment() {
  const [data, setData] = useState([]);

  // Get ALl Comments
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

  // Function to render star icons
  const renderStars = (numStars) => {
    const filledStars = Math.min(Math.max(Math.round(numStars || 0), 0), 5); // Ensure numStars is a valid integer between 0 and 5
    const emptyStars = 5 - filledStars;

    return (
      <>
        {Array(filledStars)
          .fill(null)
          .map((_, index) => (
            <BsStarFill key={index} />
          ))}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <BsStar key={index} />
          ))}
      </>
    );
  };

  return (
    <Layout title={"Reviews"}>
      <div className="all-comment-wrapper">
        <div className="comment-top-bar">
          <h1 className=" text-center text-3xl text-white font-extrabold">
            What People Are Saying About Molly Maid
          </h1>
        </div>
        <div className="all-comments-container flex flex-col gap-[3rem] p-[1rem] mt-[3rem] sm:px-[1.5rem]  ">
          {data?.map((c) => (
            <div className="all-comment-box flex flex-col gap-3" key={c?._id}>
              <div className="user-info-comment flex items-center gap-4 flex-col sm:flex-row">
                <img
                  src={`/api/v1/auth/user-photo/${c?.uid}`}
                  alt="...userimg"
                  className="w-[3rem] h-[3rem] rounded-md cursor-pointer"
                />
                <div className="comment-stars flex items-center gap-2">
                  {renderStars(c?.stars)}
                </div>
                <h3 className="font-bold text-green-950 text-xl">{c?.user}</h3>
              </div>
              <div className="reviews">
                <p className="text-md text-zinc-500 md:max-w-5xl text-justify">
                  {c?.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
