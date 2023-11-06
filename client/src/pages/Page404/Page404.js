import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

export default function Page404() {
  return (
    <>
      <Layout title={"Page-not-found"}>
        <div className="pagenotFound">
          <h1>Page Not Found</h1>
          <h3>Oops ! Page Not Found 🥵</h3>
          <Link to="/">Go Back</Link>
        </div>
      </Layout>
    </>
  );
}
