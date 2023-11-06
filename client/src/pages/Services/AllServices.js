import React, { useEffect, useState } from "react";
import "./allServices.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

export default function AllServices() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  // Get Services
  const getServices = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/service/get-services`
      );
      setData(data?.services);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getServices();
  }, []);

  return (
    <Layout title={"All Services"}>
      <div className="w-full min-h-[40rem] bg-gray-300 service-container px-4  ">
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "'Croissant One', cursive",
            textAlign: "center",
            marginBottom: "2rem",
            color: "#01271d",
          }}
        >
          Services We Provide
        </h1>
        <div className="service-card-container">
          {data?.map((s) => (
            <div
              className="service1-card"
              key={s?._id}
              onClick={() => navigate(`/service/detail/${s?._id}`)}
            >
              <div className="image w-[100%] h-[18rem] overflow-hidden rounded-sm object-cover">
                <img
                  src={`http://localhost:5000/api/v1/service/service-route/${s?._id}`}
                  alt="service_img"
                  className="w-full h-full"
                />
              </div>
              <div
                className="service-details flex flex-col gap-3 w-full"
                style={{ padding: "1rem .5rem" }}
              >
                <h2 className="font-medium text-2xl capitalize text-white">
                  {s?.name}
                </h2>
                <p
                  style={{ fontSize: "1rem", fontWeight: "500", color: "#ddd" }}
                >
                  {s?.plan.slice(0, 100)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
