import React, { useEffect, useState } from "react";
import "./Order.css";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Profile/SideBar/Sidebar";
import axios from "axios";
import { useAuth } from "../../context/Auths";
import moment from "moment";

export default function Order() {
  const [userOrder, setUserOrder] = useState([]);
  const [auth] = useAuth();
  const userId = auth?.user?.id;
  console.log(userOrder);

  // Get ALL Orders
  const getOrder = async () => {
    try {
      const { data } = await axios.get(`/api/v1/order/get-order`);

      // Filter orders based on userId
      const userOrders = data?.orders.filter(
        (order) => order.userId === userId
      );
      setUserOrder(userOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <Layout>
      <div className="Order-container">
        <div className="order-sidebar">
          <Sidebar />
        </div>
        <div className="order-main py-[2rem] px-4 sm:px-2">
          <h1 className="text-white text-3xl text-center font-lg ">
            All Orders
          </h1>

          {/* User Order */}

          <div className="flex flex-col gap-3 py-5 px-2">
            <div className="flex flex-col gap-3  ">
              {userOrder?.map((o, i) => (
                <div
                  className="user_order flex items-center justify-between"
                  key={i}
                >
                  <table key={i}>
                    <thead>
                      <tr>
                        <th>Sr#</th>
                        <th>Service</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td data-label="Sr#">{i + 1}</td>
                        <td data-label="Service">{o?.service}</td>
                        <td data-label="Payment">$ {o?.price}</td>
                        <td data-label="Status">{o?.status}</td>
                        <td data-label="date">
                          {moment(o?.createdAt).format("MMMM D, YYYY")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
