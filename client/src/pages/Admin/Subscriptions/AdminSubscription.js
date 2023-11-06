import React, { useEffect, useState } from "react";
import "./sub.css";
import Layout from "../../../components/Layout/Layout";
import AdminSidebar from "../../../components/AdminMenu/AdminSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function AdminSubscription() {
  const [data, setData] = useState([]);

  // Get All User
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`/api/v1/news/get-news`);
      setData(data?.news);
    } catch (error) {
      console.log("Error getting users!", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Delete User
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/news/delete-news/${id}`);
      if (data?.success) {
        toast.success("Delete successfully!", {
          theme: "colored",
          position: "top-center",
        });
        getUsers();
      }
    } catch (error) {
      toast.error("Error while delete subscription!", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return (
    <Layout title={"All Users"}>
      <div className="admin-dasboard-container relative select-none">
        <div className="admin-sideBar">
          <AdminSidebar />
        </div>
        <div className="admin-main-container">
          <h1 className="text-center font-lg text-3xl md:text-4xl text-white">
            Subscription
          </h1>

          <div className="admin-sub-details">
            <table>
              <thead>
                <tr>
                  <th>Sr#</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((s, i) => (
                  <tr key={s?._id}>
                    <td data-label="Sr#">{i}</td>
                    <td data-label="Email">{s?.email}</td>
                    <td data-label="Action">
                      <button onClick={() => handleDelete(s?._id)}>
                        <RiDeleteBin2Line size={28} color="red" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
