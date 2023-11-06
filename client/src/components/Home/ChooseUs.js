import React from "react";
import "./slider.css";
import { MdCleaningServices } from "react-icons/md";

export default function ChooseUs() {
  return (
    <div className="choose-container w-full bg-white">
      <div className="choose-box">
        <div className="choose-content">
          <h1>Why Choose Us</h1>
          <ul>
            <li>
              <MdCleaningServices />
              Cleaning and sanitizing services.
            </li>
            <li>
              <MdCleaningServices />
              Professional Staff.
            </li>
            <li>
              <MdCleaningServices />
              Customized cleaning plans.
            </li>
            <li>
              <MdCleaningServices />
              24-hour warranty.
            </li>
            <li>
              <MdCleaningServices />
              No contracts.
            </li>
            <li>
              <MdCleaningServices />
              The Neighborly Done Right Promise™.
            </li>
          </ul>
        </div>
        <div className="choose-video">
          <iframe
            width="560"
            height="400"
            src="https://www.youtube.com/embed/I1kCO7wXR6M?si=qEyUuBXsqKcZrGrZ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
