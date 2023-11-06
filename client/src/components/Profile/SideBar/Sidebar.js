import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { AiOutlineSetting } from "react-icons/ai";
import { MdCleaningServices } from "react-icons/md";

export default function Sidebar() {
  return (
    <div className="profile-sidebar-container">
      <div className="pro-sidebar">
        <ul>
          <NavLink to={`/dashboard/user/profile`}>
            <li>
              <ImProfile />
              <span>Profile</span>
            </li>
          </NavLink>
          <NavLink to="/dashboard/user/order">
            <li>
              <MdCleaningServices />
              <span>Orders</span>
            </li>
          </NavLink>
          <NavLink to="/dashboard/user/updateProfile">
            <li>
              <AiOutlineSetting />
              <span>Sitting</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
