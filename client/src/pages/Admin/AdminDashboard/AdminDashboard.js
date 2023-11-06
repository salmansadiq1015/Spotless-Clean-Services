import React from "react";
import "./admin.css";
import Layout from "../../../components/Layout/Layout";
import AdminSidebar from "../../../components/AdminMenu/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auths";

export default function AdminDashboard() {
  const [auth] = useAuth();
  const userId = auth?.user?.id;
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="admin-dasboard-container">
        <div className="admin-sideBar">
          <AdminSidebar />
        </div>
        <div className="admin-main-container p-6">
          <h1
            className="text-center text-5xl text-white"
            style={{ fontFamily: "Croissant One, cursive" }}
          >
            Admin Dashboard
          </h1>
          <div className="user-dasgboard-box flex items-center justify-center pt-6 flex-col gap-4">
            <img
              src={`http://localhost:5000/api/v1/auth/user-photo/${userId}`}
              alt="profile_img"
              className="rounded-full w-[8rem] h-[8rem]"
            />
            <h1 className="text-3xl  text-white">
              Wellcome, {auth?.user?.name}
            </h1>
            <h3 className=" text-white">
              "Ensure user privacy with end-to-end encryption and robust data
              protection measures for personal information on the website."
            </h3>
            <button
              onClick={() => navigate("/dashboard/user/profile")}
              className=" rounded-sm cursor-pointer"
              style={{
                border: "2px solid #fff",
                padding: ".3rem .7rem",
                color: "#fff",
              }}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
