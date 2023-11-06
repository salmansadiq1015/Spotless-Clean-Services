import React from "react";
import "./style.css";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Profile/SideBar/Sidebar";
import { useAuth } from "../../context/Auths";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [auth] = useAuth();
  const userId = auth?.user?.id;
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="Profile-container">
        <div className="profile-sidebar">
          <Sidebar />
        </div>
        <div className="profile-main p-6">
          <h1
            className="text-center text-5xl"
            style={{ fontFamily: "Croissant One, cursive" }}
          >
            Dashboard
          </h1>
          <div className="user-dasgboard-box flex items-center justify-center pt-6 flex-col gap-4">
            <img
              src={`http://localhost:5000/api/v1/auth/user-photo/${userId}`}
              alt="profile_img"
              className="rounded-full w-[8rem] h-[8rem]"
            />
            <h1 className="text-3xl">Wellcome, {auth?.user?.name}</h1>
            <h3>
              "Ensure user privacy with end-to-end encryption and robust data
              protection measures for personal information on the website."
            </h3>
            <button
              onClick={() => navigate("/dashboard/user/profile")}
              className=" rounded-sm cursor-pointer"
              style={{ border: "2px solid #fff", padding: ".3rem .7rem" }}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
