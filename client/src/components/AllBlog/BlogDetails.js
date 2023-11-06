import React, { useEffect, useState } from "react";
import "./blogDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";

export default function BlogDetails() {
  const params = useParams();
  const [data, setData] = useState([]);

  const getSingleBlog = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/blogs/single-blog/${params.id}`
      );
      setData(data?.blog);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleBlog();

    // eslint-disable-next-line
  }, []);
  return (
    <Layout title={"Blog-Detail"}>
      <div className="blog-details-wrapper">
        <div className="blog-detail-container">
          <div data-aos="fade-up" className="blogdetail-header">
            <span>{moment(data?.createdAt).format("MMMM D, YYYY")}</span>
            <h1>{data?.title}</h1>
            <p className="text-2xl font-bold">
              {data?.auth}, {data?.designation}
            </p>
          </div>
          <div className="blogdetail-content1" data-aos="fade-up">
            <img src={`/api/v1/blogs/banner-image/${params.id}`} alt="" />
            {ReactHtmlParser(data?.description)}
          </div>
        </div>
      </div>
    </Layout>
  );
}
