import React, { useEffect, useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import {
  AiFillLinkedin,
  AiFillFacebook,
  AiFillYoutube,
  AiTwotoneHome,
} from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareWhatsapp, FaLocationDot } from "react-icons/fa6";
import { GiModernCity } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import { BsFillTelephoneForwardFill, BsFillPhoneFill } from "react-icons/bs";
import { FcAbout, FcShop, FcContacts } from "react-icons/fc";
import { MdPolicy } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/news/create-news`,
        { email }
      );
      if (data?.success) {
        setEmail("");
        Swal.fire("Good job!", "Email sending successfully!", "success");
        // toast.success("Email sending successfully!", {
        //   theme: "dark",
        //   position: "top-center",
        // });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This email is already registered for subscription!",
          // footer: '<a href="">Please use another email?</a>',
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // Get Contact
  const getContact = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/contact/get-contact`
      );
      setContact(data?.contact);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  // Retrun statemant
  return (
    <div className="footer-container ">
      <div className="footer-context">
        <div className="left-area">
          <h3>Contact</h3>
          <ul>
            <li>
              <GiModernCity /> {contact[0]?.city}
            </li>
            <li>
              <FaLocationDot />
              {contact[0]?.country}
            </li>
            <li>
              <CgWebsite />
              {/* <Link to="https://salmansadiq.netlify.app/" target="blank" > */}
              {contact[0]?.email}
              {/* </Link> */}
            </li>
            <li>
              {" "}
              <BsFillPhoneFill />
              {contact[0]?.phone}
            </li>
            <li>
              {" "}
              <BsFillTelephoneForwardFill />
              {contact[0]?.telephone}
            </li>
          </ul>
        </div>
        <div className="right-area">
          <h3>Useful Links</h3>
          <ul>
            <Link to="/">
              <li>
                <AiTwotoneHome color="rgb(255, 0, 85)" />
                Home
              </li>
            </Link>
            <Link to="/about">
              <li>
                <FcAbout />
                About
              </li>
            </Link>
            <Link to="/all-services">
              <li>
                <FcShop />
                All Services
              </li>
            </Link>
            <Link to="/policy">
              <li>
                <MdPolicy color="rgb(0, 184, 0)" />
                Policy
              </li>
            </Link>
            <Link to="/contact">
              <li>
                <FcContacts />
                Contact
              </li>
            </Link>
          </ul>
        </div>
        <div className="newsletter">
          <h3>Subscribe now for exclusive updates & offers</h3>
          <form className="inputbox" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">
              Subscribe <IoSendSharp />
            </button>
          </form>
          <div className="icons">
            <Link to="">
              <AiFillLinkedin color="rgb(0, 110, 255)" />
            </Link>
            <Link to="">
              <AiFillFacebook color="rgb(4, 0, 255)" />
            </Link>
            <Link to="">
              <FaInstagramSquare color="rgb(255, 0, 149)" />
            </Link>
            <Link to="">
              <AiFillYoutube color="rgb(255, 0, 0)" />
            </Link>
            <Link to="">
              <FaSquareWhatsapp color="rgb(0, 245, 0)" />
            </Link>
          </div>
        </div>
        {/*  */}
      </div>
      {/*  */}
      <div className="footer-bottom">
        <Link to="/" style={{ borderRadius: ".4rem", overflow: "hidden" }}>
          <img src="/logo1.jpg" alt="logo" className="logo" />
        </Link>
        <h3>
          Created by{" "}
          <Link to="https://salmansadiq.netlify.app/" target="blank">
            Master-JS
          </Link>{" "}
          &copy; | All right reserved 2023
        </h3>
      </div>
    </div>
  );
}
