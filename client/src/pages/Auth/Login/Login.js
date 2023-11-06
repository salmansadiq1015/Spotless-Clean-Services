import React, { useState } from "react";
import "../Signup/signup.css";
import Layout from "../../../components/Layout/Layout";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAuth } from "../../../context/Auths";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [auth, setAuth] = useAuth();

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/auth/login-user`,
        { email, password }
      );
      if (data?.success) {
        setAuth({ ...auth, user: data?.user, token: data?.token });
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Login successfully", {
          position: "top-center",
          theme: "dark",
        });
        navigate("/");
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
          <h1>Sign in to your account</h1>
          <form onSubmit={handleSubmit}>
            {/* ------------Information----------- */}

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
            <div className="forgot-pass flex items-center justify-between">
              <span>
                <input type="checkbox" required value="Remember me" /> Remember
                me
              </span>
              <Link to="/forgot " className="text-green-900 text-lg">
                Forgot password?
              </Link>
            </div>
            <div className=" text-gray-400">
              Not a member?{" "}
              <Link
                to="/register"
                style={{ color: "#003326", fontWeight: "600" }}
              >
                Register
              </Link>
            </div>

            <div className="submit w-Full">
              <button type="submit" className="btn float-right" style={{color:"#fff"}}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
