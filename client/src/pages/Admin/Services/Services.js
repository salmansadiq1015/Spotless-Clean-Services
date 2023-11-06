import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import AdminSidebar from "../../../components/AdminMenu/AdminSidebar";
import AllServices from "../../../components/Admin/Services";
import { AiOutlinePlusCircle } from "react-icons/ai";
// import AddServices from "../../../components/Admin/AddServices";

export default function Services() {
  const [show, setShow] = useState(false);

  return (
    <Layout>
      <div className="admin-dasboard-container relative select-none">
        <div className="admin-sideBar">
          <AdminSidebar />
        </div>
        <div className="admin-main-container">
          <AiOutlinePlusCircle
            size={32}
            className="addbtn "
            onClick={() => setShow(!show)}
          />

          <AllServices show={show} setShow={setShow} />
        </div>
        {/* {show ? <AddServices /> : ""} */}
      </div>
    </Layout>
  );
}
