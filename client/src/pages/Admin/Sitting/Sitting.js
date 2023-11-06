import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import AdminSidebar from "../../../components/AdminMenu/AdminSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import "./sitting.css";

export default function Sitting() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [telephone, setTelephone] = useState("");
  const [id, setId] = useState("");

  // Get Contact Details
  const getContacts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/contact/get-contact`);

      setId(data?.contact[0]?._id);
      setEmail(data?.contact[0]?.email);
      setCity(data?.contact[0]?.city);
      setCountry(data?.contact[0]?.country);
      setPhone(data?.contact[0]?.phone);
      setTelephone(data?.contact[0]?.telephone);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  // Update Information
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/contact/update-contact/${id}`, {
        city,
        country,
        phone,
        email,
        telephone,
      });
      if (data?.success) {
        toast.success("Information updated!", {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Error while update contact information!", {
        position: "top-center",
      });
    }
  };
  return (
    <div>
      <Layout>
        <div className="admin-dasboard-container relative select-none">
          <div className="admin-sideBar">
            <AdminSidebar />
          </div>
          <div className="admin-main-container px-2 py-6 sm:px-4">
            <h1 className="text-center text-3xl font-lg sm:text-4xl text-white">
              Contact Details
            </h1>

            <div className="admin-contact-details flex items-center justify-center min-h-screen w-full">
              <div
                className="admin-contact w-[25rem] sm:w-[28rem] border-2 border-white
               rounded-md overflow-hidden px-3 sm:px-1 py-6"
              >
                <form onSubmit={handleForm} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=""
                  />
                  <input
                    type="text"
                    placeholder="Phone..."
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Telephone Number"
                    required
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="City/Province"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-[.9rem] py-[.4rem] rounded-md bg-green-600
                   text-white text-lg cursor-pointer shadow-md hover:bg-green-700 transition"
                  >
                    Update Information
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
