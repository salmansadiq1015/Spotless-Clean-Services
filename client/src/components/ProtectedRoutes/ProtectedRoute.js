import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auths";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

export default function ProtectedRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  console.log(ok);

  //   Check Auth
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/auth/user-auth`
      );
      if (res?.data?.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
