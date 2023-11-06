import React, { useEffect, useState } from "react";
import "./profile.css";
import { useAuth } from "../../../context/Auths";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileMein() {
  const [auth] = useAuth();
  const [data, setData] = useState([]);
  const userId = auth?.user?.id;
  const navigate = useNavigate();

  console.log(data);

  // Get Single User
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/auth/single-user/${auth?.user?.id}`
      );
      console.log(data?.users);
      setData(data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="main-profile-container pt-6 p-3 select-none">
      <h1
        className="text-center text-5xl"
        style={{ fontFamily: "Croissant One, cursive" }}
      >
        User Profile
      </h1>
      <div className="main-profile-box pt-10 ">
        <div
          className="relative xl:w-[37rem] h-[19rem] rounded-md overflow-hidden object-fill"
          style={{ border: "2px solid #333" }}
        >
          <img
            src={`http://localhost:5000/api/v1/auth/cover-photo/${userId}`}
            alt="cover"
            className="w-full h-full rounded-md"
          />
        </div>

        <div
          className="profile-image rounded-full w-[10rem] h-[10rem] overflow-hidden object-fill translate-y-[-4rem]"
          style={{ border: "2px solid #ccc" }}
        >
          <img
            src={`http://localhost:5000/api/v1/auth/user-photo/${userId}`}
            alt="profile"
            className="w-full h-full"
          />
        </div>
        <div className="profile-details text-start w-full ">
          <h1>Full name:</h1>
          <span>{data?.name}</span>
        </div>
        <div className="profile-details text-start w-full ">
          <h1>Email Address:</h1>
          <span>{data?.email}</span>
        </div>
        <div className="profile-details text-start w-full ">
          <h1>Phone:</h1>
          <span>{data?.phone}</span>
        </div>
        <div className="profile-details text-start w-full ">
          <h1>Address:</h1>
          <span>{data?.address}</span>
        </div>

        <div className="update-btn pt-6 pb-2">
          <button onClick={() => navigate("/dashboard/user/updateProfile")}>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
