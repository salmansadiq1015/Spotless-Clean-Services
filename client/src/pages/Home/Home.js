import React from "react";
import "./Home.css";
import Layout from "../../components/Layout/Layout";
import Carousel from "../../components/Home/Carousel";
import CleanServices from "../../components/Home/CleanServices";
import ChooseUs from "../../components/Home/ChooseUs";
import HomeSection4 from "../../components/Home/CleanServices/HomeSection4";
import Comment1 from "../Comment/Comment1";
import Blogs from "../../components/Home/Blogs";
import Nabour from "../../components/Home/Nabour";

export default function Home() {
  return (
    <Layout>
      <div className="Home-Page-container">
        {/* Section1 */}
        <div className="carousel w-full h-[45rem]">
          <Carousel />
        </div>

        {/* Section2 */}
        <div className="clean-services-container ">
          <CleanServices />
        </div>

        {/* section3 */}
        <div className="chooseUs ">
          <ChooseUs />
        </div>

        {/* section4 */}
        <section className="home-section4">
          <HomeSection4 />
        </section>

        {/* section5 */}
        <section className="home-section5 w-full min-h-[100vh]">
          <Comment1 />
        </section>

        {/* ---Blog Section---- */}
        <section className="home-section5 w-full min-h-[100vh]">
          <Blogs />
        </section>

        {/* ---Blog Section---- */}
        <section className="home-section5 w-full min-h-[80vh]">
          <Nabour />
        </section>
      </div>
    </Layout>
  );
}
