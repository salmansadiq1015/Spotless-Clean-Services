import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auths";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(true);
  const [auth] = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await axios.get("/api/v1/auth/admin-auth");
      if (data?.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) checkAuth();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
