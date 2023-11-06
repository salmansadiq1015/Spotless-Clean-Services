import React, { useState } from "react";
import "./layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";
import { AiOutlineComment } from "react-icons/ai";
import Comment from "../Comment/Comment";

export default function Layout({
  children,
  title,
  description,
  keywords,
  author,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="layout-container">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "100vh" }} className="layout-children">
        {children}
        <div className="comment" onClick={() => setShow(!show)}>
          <AiOutlineComment size={30} color="#fff" />
        </div>
        {show && (
          <div className="comment-box">
            <Comment setShow={setShow} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Default Props

Layout.defaultProps = {
  title: "SpotlessShine",
  description:
    "Mern Stack Project with React JS, Node JS, Express JS, MongoDB, BootStrap , CSS3, HTML5, JavaScript, & Tailwind CSS ",
  keywords:
    "Cleaning Services,House Cleaning, Commercial Cleaning,Residential Cleaning,,Professional Cleaners, Maid Service,Deep Cleaning,Eco-Friendly Cleaning,Office Cleaning,Janitorial Services, Carpet Cleaning, Window Cleaning, Move-In/Move-Out Cleaning, Disinfection Services, Green Cleaning,  Post-Construction Cleaning, Apartment Cleaning, Weekly/Bi-weekly Cleaning, One-Time Cleaning, Pet-Friendly Cleaning, Kitchen Cleaning, Bathroom Cleaning, Floor Cleaning, Upholstery Cleaning, Home Organization, Decluttering Services, Steam Cleaning, Housekeeping, Sanitization",
  author: "M Salman",
};
