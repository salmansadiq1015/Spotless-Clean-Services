import React, { useEffect, useState } from "react";
import "../Signup/signup.css";
import Layout from "../../../components/Layout/Layout";
import Swal from "sweetalert2";
import { BsFillImageFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Auths";
import "./profile.css";
import Sidebar from "../../../components/Profile/SideBar/Sidebar";

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [photo, setPhoto] = useState("");
  const [cover, setCover] = useState("");
  const navigate = useNavigate();
  const [auth] = useAuth();

  // Get Single User
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/auth/single-user/${auth?.user?.id}`
      );
      console.log(data?.users);
      setName(data?.users?.name);
      setPhone(data?.users?.phone);
      setAddress(data?.users?.address);
      setAnswer(data?.users?.answer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("answer", answer);
      formData.append("photo", photo);
      formData.append("cover", cover);
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/auth/update-profile/${auth?.user?.id}`,
        formData
      );
      if (data?.success) {
        getUser();
        Swal.fire(
          "Good job!",
          "Congratulations! Your profile updated successfully!",
          "success"
        );
        navigate("/dashboard/user/profile");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <Layout>
      <div className="Profile-container">
        <div className="profile-sidebar">
          <Sidebar />
        </div>

        {/* Profile Main */}
        <div className="profile-main">
          <h1
            className="text-center text-5xl"
            style={{ fontFamily: "Croissant One, cursive" }}
          >
            Update Profile
          </h1>
          <div className="form-wrapper">
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
                    <img
                      src={`http://localhost:5000/api/v1/auth/user-photo/${auth?.user?.id}`}
                      alt="profile"
                    />
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
              {/* Cover */}
              <div className="cover-photo-container">
                {cover ? (
                  <AiOutlineCloseCircle onClick={() => setCover("")} />
                ) : (
                  <label
                    htmlFor="coverImage"
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                    }}
                  >
                    <BsFillImageFill size={24} color="orangered" />
                    Update Cover
                  </label>
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
                  <div className="cover-image">
                    <img
                      src={URL.createObjectURL(cover)}
                      alt="cover_photo"
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <img
                    src={`http://localhost:5000/api/v1/auth/cover-photo/${auth?.user?.id}`}
                    alt="cover_image"
                    className="img img-responsive"
                  />
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

              <div className="submit w-Full">
                <button
                  type="submit"
                  className="btn float-right hover:text-teal-50"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
