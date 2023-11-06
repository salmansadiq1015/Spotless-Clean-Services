import React, { useEffect, useState } from "react";
import "./user.css";
import Layout from "../../../components/Layout/Layout";
import AdminSidebar from "../../../components/AdminMenu/AdminSidebar";
import axios from "axios";
import { RiDeleteBin2Line } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Users() {
  const [data, setData] = useState([]);

  // Get All User
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/all-user`);
      setData(data?.users);
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
      const { data } = await axios.delete(`/api/v1/auth/delete-user/${id}`);
      if (data?.success) {
        toast.success("User delete successfully!", {
          theme: "colored",
          position: "top-center",
        });
        getUsers();
      }
    } catch (error) {
      toast.error("Error while delete user!", {
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
        <div className="admin-main-container px-2 py-4 sm:px-4">
          <h1 className="text-center font-lg text-3xl md:text-4xl text-white">
            Users
          </h1>

          <div className="admin-user-details">
            <table>
              <thead>
                <tr>
                  <th>Sr#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((u, i) => (
                  <tr key={u?._id}>
                    <td data-label="Sr#">{i}</td>
                    <td className="" data-label="Photo">
                      <img
                        src={`/api/v1/auth/user-photo/${u?._id}`}
                        alt="..."
                        className="w-[3rem] h-[3rem] rounded-md m-auto"
                      />
                    </td>
                    <td data-label="Name">{u?.name}</td>
                    <td data-label="Email">{u?.email}</td>
                    <td data-label="Phone">{u?.phone}</td>
                    <td data-label="Address">{u?.address}</td>
                    <td data-label="Action">
                      <button onClick={() => handleDelete(u?._id)}>
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
