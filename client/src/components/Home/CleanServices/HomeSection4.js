import React from "react";
import "./Style.css";

export default function HomeSection4() {
  return (
    <div className="cservice-container">
      <div className="cs-content-wrapper">
        <div className="cs-image">
          <img src="/cs1.webp" alt="cs_image" />
        </div>
        <div className="cs-content">
          <h1>Our Cleaning Services</h1>
          <h2>And Our Continued Commitment To You</h2>
          <p>
            Since 1984, customers have welcomed the trusted cleaning
            professionals from locally owned and operated Molly Maid businesses
            into their homes. We’ve provided cleaning services to over a million
            customers, and want you to know that you can continue to rely on us
            to go above and beyond to provide you with a worry-free, top-notch
            cleaning service every time.
          </p>
          <h3>
            Taking care of homes and those in them is what we do best. We firmly
            believe a healthy home is a clean home!
          </h3>
          <button>Request a Free Estimate</button>
        </div>
      </div>
    </div>
  );
}
