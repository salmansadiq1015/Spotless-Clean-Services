import React, { useState } from "react";
import "../Signup/signup.css";
import Layout from "../../../components/Layout/Layout";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiFillCloseCircle,
} from "react-icons/ai";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [newpassword, setnewRassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/auth/forgot-password`,
        { email, answer, newpassword }
      );
      if (data?.success) {
        toast.success("Password reset successfully!", {
          position: "top-center",
          theme: "dark",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please provide correct email and security answer!",
        });
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
      <div className="register-container">
        <div className="form-wrapper relative">
          <div className="absolute top-3 right-4">
            <AiFillCloseCircle
              size={28}
              color="#003326"
              onClick={() => navigate("/login")}
            />
          </div>
          <h1>Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            {/* ------------Information----------- */}

            <div className="inputBox">
              <input
                type="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name={`email_${Math.random().toString(36).substring(7)}`}
              />
              <span>Email</span>
            </div>
            <div className="inputBox">
              <input
                type="text"
                required
                autoComplete="off"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <span>What is your best friend name?</span>
            </div>
            <div className="inputBox password">
              <input
                type={showPass ? "text" : "password"}
                required
                autoComplete="off"
                value={newpassword}
                onChange={(e) => setnewRassword(e.target.value)}
              />
              {showPass ? (
                <AiFillEyeInvisible onClick={() => setShowPass(!showPass)} />
              ) : (
                <AiFillEye onClick={() => setShowPass(!showPass)} />
              )}

              <span>New Password</span>
            </div>

            <div className="submit w-Full">
              <button
                type="submit"
                className="btn float-right"
                style={{ width: "6rem" }}
              >
                Forgot
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
