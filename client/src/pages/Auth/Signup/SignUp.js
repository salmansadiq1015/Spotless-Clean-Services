import React, { useState } from "react";
import "./signup.css";
import Layout from "../../../components/Layout/Layout";
import Swal from "sweetalert2";
import { BsFillImageFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [photo, setPhoto] = useState("");
  const [cover, setCover] = useState("");
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("answer", answer);
      formData.append("photo", photo);
      formData.append("cover", cover);
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/auth/create-user`,
        formData
      );
      if (data?.success) {
        Swal.fire(
          "Good job!",
          "Congratulations! You are now successfully registered",
          "success"
        );
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
        setAnswer("");
        setPhoto("");
        setCover("");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        // footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <Layout>
      <div className="register-container">
        <div className="form-wrapper">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="profile-photo">
              <input
                type="file"
                required
                id="profileImg"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                style={{ display: "none" }}
              />
              <div className="profileImage">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="profile"
                    className="img img-responsive"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                ) : (
                  <img src="/adduser.webp" alt="profile" />
                )}
                <label
                  htmlFor="profileImg"
                  style={{
                    padding: ".4rem .6rem",
                    background: "#111827",
                    borderRadius: ".3rem",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: ".2rem .2rem .2rem rgba(0,0,0,.3)",
                  }}
                >
                  {photo ? "Change Image" : "Profile Image"}
                </label>
              </div>
            </div>
            <div className="cover-photo-container">
              {cover ? (
                <AiOutlineCloseCircle onClick={() => setCover("")} />
              ) : (
                ""
              )}
              <input
                type="file"
                required
                id="coverImage"
                accept="image/*"
                onChange={(e) => setCover(e.target.files[0])}
                style={{ display: "none" }}
              />
              {cover ? (
                <img
                  src={URL.createObjectURL(cover)}
                  alt="cover_image"
                  className="img img-responsive"
                />
              ) : (
                <div className="cover-image">
                  <label htmlFor="coverImage">
                    <BsFillImageFill />
                    Upload Cover Image
                  </label>
                </div>
              )}
            </div>
            {/* ------------Information----------- */}
            <div className="inputBox">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>Full Name</span>
            </div>
            <div className="inputBox">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Email</span>
            </div>
            <div className="inputBox password">
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPass ? (
                <AiFillEyeInvisible onClick={() => setShowPass(!showPass)} />
              ) : (
                <AiFillEye onClick={() => setShowPass(!showPass)} />
              )}

              <span>Password</span>
            </div>
            <div className="inputBox">
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <span>Phone</span>
            </div>
            <div className="inputBox">
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span>Address</span>
            </div>
            <div className="inputBox">
              <input
                type="text"
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <span>What is your best friend name?</span>
            </div>
            <div className=" text-gray-400">
              Already have an Account?{" "}
              <Link to="/login" style={{ color: "#003326", fontWeight: "600" }}>
                Login
              </Link>
            </div>
            <div className="submit w-Full">
              <button type="submit" className="btn float-right">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
