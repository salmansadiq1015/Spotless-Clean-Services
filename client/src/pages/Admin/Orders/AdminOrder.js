import React, { useEffect, useState } from "react";
import "./order.css";
import Layout from "../../../components/Layout/Layout";
import AdminSidebar from "../../../components/AdminMenu/AdminSidebar";
import axios from "axios";
import { MdAutoDelete } from "react-icons/md";
import { toast } from "react-toastify";
import moment from "moment";

export default function AdminOrder() {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Working",
    "Complete",
    "Cancel",
    "Not In Range!",
  ]);

  // Get ALL Orders
  const getOrder = async () => {
    try {
      const { data } = await axios.get(`/api/v1/order/get-order`);
      setOrder(data?.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  // Change Statue

  const handleChange = async (id, value) => {
    try {
      const { data } = await axios.put(`/api/v1/order/change-status/${id}`, {
        status: value,
      });

      if (data?.success) {
        toast.success("Status updated successfully!", {
          theme: "colored",
          position: "top-center",
        });
        getOrder();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while status updated!", {
        theme: "colored",
        position: "top-center",
      });
    }
  };

  // Delete Order
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.delete(`/api/v1/order/delete-order/${id}`);
      if (data) {
        toast.success("Order deleted successfully!", {
          theme: "colored",
          position: "top-center",
        });
        getOrder();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while delete order!", {
        theme: "colored",
        position: "top-center",
      });
    }
  };
  return (
    <Layout title={"All Users"}>
      <div className="admin-dasboard-container relative select-none">
        <div className="admin-sideBar">
          <AdminSidebar />
        </div>
        <div className="admin-main-container py-[2rem] px-4 sm:px-2">
          <h1 className="text-white text-3xl text-center font-lg ">
            All Orders
          </h1>

          {/* All Order */}
          <div className="order-wrappers">
            {order?.map((o, i) => (
              <table key={i}>
                <thead>
                  <tr>
                    <th>Sr#</th>
                    <th>Name</th>
                    <th>Service</th>
                    <th>Payment</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Sr#">{i + 1}</td>
                    <td data-label="Name">{o?.user}</td>
                    <td data-label="Service">{o?.service}</td>
                    <td data-label="Payment">$ {o?.price}</td>
                    <td data-label="Email">{o?.email}</td>
                    <td data-label="Phone">{o?.phone}</td>
                    <td data-label="Address">{o?.address}</td>
                    <td data-label="Status">
                      <select
                        onChange={(e) => handleChange(o._id, e.target.value)}
                        defaultValue={o?.status}
                        style={{
                          background: "#000",
                          padding: ".3rem 0rem",
                          cursor: "pointer",
                          border: "1px solid #fff",
                          borderRadius: ".3rem",
                        }}
                      >
                        {status?.map((s, i) => (
                          <option
                            key={i}
                            value={s}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td data-label="date">
                      {moment(o?.createdAt).format("MMMM D, YYYY")}
                    </td>
                    <td data-label="Action">
                      <MdAutoDelete
                        size={26}
                        color="red"
                        onClick={() => handleDelete(o._id)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
