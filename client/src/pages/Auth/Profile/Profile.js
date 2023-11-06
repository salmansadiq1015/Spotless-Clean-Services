import React from "react";
import "./profile.css";
import Layout from "../../../components/Layout/Layout";
import Sidebar from "../../../components/Profile/SideBar/Sidebar";
import ProfileMein from "../../../components/Profile/Main/ProfileMein";
import { useParams } from "react-router-dom";

export default function Profile() {
  const params = useParams();
  const userId = params.id;
  return (
    <Layout>
      <div className="Profile-container">
        <div className="profile-sidebar">
          <Sidebar userId={userId} />
        </div>
        <div className="profile-main">
          <ProfileMein userId={userId} />
        </div>
      </div>
    </Layout>
  );
}
