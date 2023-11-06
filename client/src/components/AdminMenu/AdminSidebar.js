import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
// import { ImProfile } from "react-icons/im";
import { AiOutlineSetting } from "react-icons/ai";
import {
  MdCleaningServices,
  MdOutlineMiscellaneousServices,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiMessageAltDetail } from "react-icons/bi";
import { ImBlogger } from "react-icons/im";

export default function AdminSidebar() {
  return (
    <div className="profile-sidebar-container">
      <div className="pro-sidebar">
        <ul>
          {/* <NavLink to={`/dashboard/user/profile`}>
            <li>
              <ImProfile />
              <span>Profile</span>
            </li>
          </NavLink> */}
          <NavLink to={`/dashboard/admin/services`}>
            <li>
              <MdOutlineMiscellaneousServices />
              <span>Services</span>
            </li>
          </NavLink>
          <NavLink to={`/dashboard/admin/blogs`}>
            <li>
              <ImBlogger />
              <span>Blogs</span>
            </li>
          </NavLink>
          <NavLink to={`/dashboard/admin/users`}>
            <li>
              <FaUsers />
              <span>Users</span>
            </li>
          </NavLink>
          <NavLink to="/dashboard/admin/orders">
            <li>
              <MdCleaningServices />
              <span>Orders</span>
            </li>
          </NavLink>
          <NavLink to="/dashboard/admin/subscription">
            <li>
              <BiMessageAltDetail />
              <span>Subscription</span>
            </li>
          </NavLink>
          <NavLink to="/dashboard/admin/sitting">
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
