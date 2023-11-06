import React, { useEffect, useState } from "react";
import "./contact.css";
import Layout from "../../components/Layout/Layout";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [messages, setMessages] = useState("");
  const [information, setInformation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/user-contact//create-message`,
        {
          name,
          email,
          phone,
          zip,
          messages,
        }
      );
      if (data?.success) {
        toast.success(data?.message, {
          theme: "dark",
          position: "top-center",
        });
        // Clear Message
        setName("");
        setEmail("");
        setPhone("");
        setZip("");
        setMessages("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Contact
  const getContact = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/contact/get-contact`
      );
      setInformation(data?.contact[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContact();
  }, []);

  return (
    <>
      <Layout title={"Contact Spoteless"}>
        <div
          className="contact-container"
          style={{ userSelect: "none", overflow: "hidden" }}
        >
          <div className="shade">
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                fontFamily: "'Croissant One', cursive",
                marginBottom: "2rem",
                color: "#fff",
                textAlign: "center",
              }}
            >
              Contact Us
            </h1>
            <div className="contact-content">
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name..."
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="number"
                  name="number"
                  placeholder="Phone..."
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Zip Code / Postal Address..."
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
                <textarea
                  name="message"
                  rows="10"
                  placeholder="Message..."
                  autoComplete="false"
                  required
                  value={messages}
                  onChange={(e) => setMessages(e.target.value)}
                ></textarea>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    borderRadius: ".3rem",
                    cursor: "pointer",
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      border: "none",
                      color: "#fff",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                      width: "7rem",
                      height: "2.8rem",
                      float: "right",
                      background: "orangered",
                      borderRadius: ".3rem",
                    }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
              <div className="map ">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.8547252102917!2d73.65009777473458!3d30.69436328748752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39181b4d3a8d8233%3A0xddd9c422109b2d3d!2sDepalPur%20Okara%20By%20Pass%20Road%2C%20Dipalpur%2C%20Okara%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1690192103990!5m2!1sen!2s"
                  width={600}
                  height={450}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            {/* Contact Detail */}
            <div className="contact-bottom">
              <div className="box-container">
                <div className="box">
                  <AiOutlineMail color="#fff" />
                  <h3>Email</h3>
                  <span>{information?.email}</span>
                </div>
                <div className="box">
                  <BsFillTelephonePlusFill color="#fff" />
                  <h3>Phone</h3>
                  <span>{information?.phone}</span>
                </div>
                <div className="box">
                  <FaMapLocationDot color="#fff" />
                  <h3>Address</h3>
                  <span>{information?.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
