import React, { useEffect, useState } from "react";
import "../Home/slider.css";
import axios from "axios";
import AddServices from "./AddServices";
import UpdateServices from "./UpdateServices";
import { toast } from "react-toastify";

export default function AllServices({ show, setShow }) {
  const [data, setData] = useState([]);
  const [ushow, setUshow] = useState(false);
  const [sid, setSid] = useState("");

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

  // Handle Update
  const handleUpdate = (id) => {
    setUshow(true);
    setSid(id);
  };

  // Delete Services
  const deleteServices = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/service/delete-service/${id}`
      );
      if (data?.success) {
        getServices();
        toast.success(data?.message, { position: "top-center", theme: "dark" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="w-full min-h-[100vh]  service-container pr-2 relative">
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem ",
          // fontFamily: "'Croissant One', cursive",
          fontWeight: "500",
          marginBottom: "2rem",
          color: "#fff",
        }}
      >
        All Services
      </h1>
      <div className="service-card-container">
        {data?.map((s) => (
          <div className="service1-card bg-white text-green-950 " key={s._id}>
            <div className="image w-[100%] h-[18rem] overflow-hidden rounded-md object-cover">
              <img
                src={`http://localhost:5000/api/v1/service/service-route/${s._id}`}
                alt="service_img"
                className="w-full h-full"
              />
            </div>
            <div
              className="service-details flex flex-col gap-3 w-full"
              style={{ padding: "1rem .5rem" }}
            >
              <h2 className="font-medium text-2xl capitalize text-green-950">
                {s.name}
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "#01271d",
                }}
              >
                {s.plan.slice(0, 80)}...
              </p>
              <div className="buttons flex items-center justify-between">
                <button
                  onClick={() => handleUpdate(s._id)}
                  className="btn hover:text-white"
                  style={{ width: "6rem" }}
                >
                  Update
                </button>
                <button
                  className="btn hover:text-white"
                  style={{ width: "6rem", background: "red" }}
                  onClick={() => deleteServices(s._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {show ? (
          <AddServices getServices={getServices} setShow={setShow} />
        ) : (
          ""
        )}
      </div>
      {ushow ? (
        <UpdateServices
          getServices={getServices}
          sid={sid}
          setUshow={setUshow}
        />
      ) : (
        ""
      )}
    </div>
  );
}
