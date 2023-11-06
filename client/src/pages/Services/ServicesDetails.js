import React, { useEffect, useState } from "react";
import "./allServices.css";
import Layout from "../../components/Layout/Layout";
import Payment from "../../components/Services/Payment";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { FaRegCreditCard } from "react-icons/fa6";

export default function ServicesDetails() {
  const params = useParams();
  const [service, setService] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  // Get Single Service
  const getService = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/service/single-service/${params.id}`
      );
      setService(data?.service);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getService();

    // eslint-disable-next-line
  }, []);
  return (
    <Layout title={"Services Details"}>
      <div className="services-wrapper1 relative">
        {/* Service Details */}
        <div className="Service-detail-container">
          <div className="Services-detail-wrapper">
            <div className="blog-detail-container mt-4">
              <div data-aos="fade-up" className="blogdetail-header">
                {/* <span>{moment(service?.createdAt).format("MMMM D, YYYY")}</span> */}
                <h1>{service?.name}</h1>
                <p className="text-2xl font-bold text-justify my-4 sm:text-4xl">
                  "{service?.plan}"
                </p>
              </div>
              <div className="blogdetail-content1">
                <img
                  src={`/api/v1/service/service-route/${params.id}`}
                  alt="..."
                  style={{ borderRadius: ".3rem" }}
                />
                {ReactHtmlParser(service?.description)}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="show-cart" onClick={() => setShowPayment(!showPayment)}>
          <FaRegCreditCard size={26} color="rgb(0, 56, 0)" />
        </div>
        {showPayment && (
          <div className="Payment-detail-container1 py-[3rem] px-[.5rem] lg:px-[2rem] absolute top-[2rem ] right-[2rem] z-100">
            <Payment
              basicprice={service.basicprice}
              standardprice={service.standardprice}
              premiumprice={service.premiumprice}
              name={service.name}
              bduration={service.bduration}
              sduration={service.sduration}
              pduration={service.pduration}
            />
          </div>
        )}

        <div className="Payment-detail-container py-[3rem] px-[.5rem] lg:px-[2rem]">
          <Payment
            basicprice={service.basicprice}
            standardprice={service.standardprice}
            premiumprice={service.premiumprice}
            name={service.name}
            bduration={service.bduration}
            sduration={service.sduration}
            pduration={service.pduration}
          />
        </div>
      </div>
    </Layout>
  );
}
