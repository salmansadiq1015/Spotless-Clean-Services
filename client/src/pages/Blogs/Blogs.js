import React from "react";
import "./blog.css";
import Layout from "../../components/Layout/Layout";
import Blog from "../../components/AllBlog/Blog";

export default function Blogs() {
  return (
    <Layout title={"Blogs"}>
      <section className="bsection1" data-aos="fade-up">
        <div className="bs1-content">
          <h3>Blog</h3>
          <h2>The latest articles and news</h2>
          <p>
            Stay up-to-date with the latest industry news as our marketing teams
            finds new ways to re-purpose old CSS tricks articles.
          </p>
        </div>
      </section>

      {/* ------------Lines------------ */}
      <div className="lines ml-[2rem]" data-aos="fade-up">
        <span></span>
        <span></span>
      </div>

      {/* -------------Blog Section--------- */}
      <section className="section2-blog-wrapper" data-aos="fade-up">
        <Blog />
      </section>
    </Layout>
  );
}
