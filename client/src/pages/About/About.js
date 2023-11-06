import React from "react";
import "./about.css";
import Layout from "../../components/Layout/Layout";
import { MdCleaningServices } from "react-icons/md";

export default function About() {
  return (
    <Layout>
      <div className="about-container">
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "'Croissant One', cursive",
            marginBottom: "2rem",
            color: "#01271d",
            textAlign: "center",
          }}
        >
          About Us
        </h1>
        <div className="content-box">
          <div className="about-image flex items-center justify-center ">
            <div className="about-image w-[98%] h-full rounded-md shadow-xl overflow-hidden">
              <img src="/about.png" alt="about" className="w-full h-full" />
            </div>
          </div>
          <div className="about-content">
            <h1
              style={{
                fontSize: "2.3rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#01271d",
                textAlign: "start",
              }}
            >
              Professional Services
            </h1>
            <p className="w-[90%] mb-4 text-lg text-justify">
              <b className="text-green-900 font-bold">Spotless.clean</b> is a
              trusted, well-trained and professional team, working for many
              years to make your commercial or residential place clean and
              healthy with a trusted team, and eco-friendly chemicals.
            </p>
            <div className="about-list">
              <ul>
                <li>
                  {" "}
                  <MdCleaningServices /> AC Services
                </li>
                <li>
                  {" "}
                  <MdCleaningServices /> Home Cleaning Services
                </li>
                <li>
                  {" "}
                  <MdCleaningServices /> Move In / Out Cleaning
                </li>
                <li>
                  {" "}
                  <MdCleaningServices /> Office Cleaning
                </li>
                <li>
                  {" "}
                  <MdCleaningServices /> AC Duct & AC Cleaning
                </li>
                <li>
                  {" "}
                  <MdCleaningServices /> Floor, Tiles or Grout Cleaning
                </li>
                <li>
                  {" "}
                  <MdCleaningServices /> Post Construction Cleaning
                </li>
                <li>
                  {" "}
                  <MdCleaningServices /> Carpet Cleaning
                </li>
                <li>
                  {" "}
                  <MdCleaningServices /> Painter Services
                </li>
                <li>
                  {" "}
                  <MdCleaningServices /> Window Cleaning
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
