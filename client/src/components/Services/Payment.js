import React, { useState } from "react";
import "./payment.css";
import { AiOutlineFieldTime } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { BsQuestionCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../../context/Auths";

export default function Payment({
  basicprice,
  standardprice,
  premiumprice,
  name,
  bduration,
  sduration,
  pduration,
}) {
  const [selectedButton, setSelectedButton] = useState("basic");

  const [qShow, setQShow] = useState(false);
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [cart, setCart] = useState([]);

  const handleButtonClick = (buttonId, price) => {
    setSelectedButton(buttonId);
    const cartItem = {
      price: price,
      service: name,
      userId: auth?.user?.id,
      user: auth?.user?.name,
      email: auth?.user?.email,
      phone: auth?.user?.phone,
      address: auth?.user?.address,
    };
    setCart(cartItem);
  };

  const buttonStyle = (buttonId) => {
    return {
      backgroundColor: selectedButton === buttonId ? "green" : "initial",
      width: "100%",
      height: "100%",
      color: selectedButton === buttonId ? "#fff" : "initial",
      curser: "pointer",
    };
  };

  // ------------Make Payment---------->
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51NprH7KJaQYf37laRC2kLrIemv2aXbJXmZTqJb98Wj6KZzC0CKiprWwf7Yp5M3EqYztzy7fGZpooGj7GmxKCTPjz00AJPqGIP7"
    );

    const body = {
      order: cart,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`/api/v1/order/payment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="payment-detail-wrapper">
      <div className="payment-details">
        <div className="buttons">
          <div
            className="button1"
            id="basic"
            style={buttonStyle("basic")}
            onClick={() => handleButtonClick("basic", basicprice)}
          >
            <button>Basic</button>
          </div>
          <span></span>
          <div
            className="button1"
            id="standard"
            style={buttonStyle("standard")}
            onClick={() => handleButtonClick("standard", standardprice)}
          >
            <button>Standard</button>
          </div>
          <span></span>
          <div
            className="button1"
            id="premium"
            style={buttonStyle("premium")}
            onClick={() => handleButtonClick("premium", premiumprice)}
          >
            <button>Premium</button>
          </div>
        </div>
        <div className="px-2 flex flex-col gap-4">
          {selectedButton === "basic" && (
            <div className="price-details">
              <h3>{name}</h3>
              <span>
                <b>Price:</b>$ {basicprice}{" "}
                <BsQuestionCircle onClick={() => setQShow(!qShow)} />
                {qShow && (
                  <p className="question">
                    To keep things simple, Spotless may round up prices that
                    contain decimals. The number you see here is the price used
                    at category.
                  </p>
                )}
              </span>

              <p className="flex items-center gap-2">
                <b>Duration:</b>
                <AiOutlineFieldTime color="#444" size={20} /> {bduration}
              </p>
            </div>
          )}
          {selectedButton === "standard" && (
            <div className="price-details">
              <h3>{name}</h3>
              <span>
                <b>Price:</b>$ {standardprice}{" "}
                <BsQuestionCircle onClick={() => setQShow(!qShow)} />
                {qShow && (
                  <p className="question">
                    To keep things simple, Spotless may round up prices that
                    contain decimals. The number you see here is the price used
                    at category.
                  </p>
                )}
              </span>

              <p className="flex items-center gap-2">
                <b>Duration:</b>
                <AiOutlineFieldTime color="#444" size={20} /> {sduration}
              </p>
            </div>
          )}
          {selectedButton === "premium" && (
            <div className="price-details">
              <h3>{name}</h3>
              <span>
                <b>Price:</b>$ {premiumprice}{" "}
                <BsQuestionCircle onClick={() => setQShow(!qShow)} />
                {qShow && (
                  <p className="question">
                    To keep things simple, Spotless may round up prices that
                    contain decimals. The number you see here is the price used
                    at category.
                  </p>
                )}
              </span>

              <p className="flex items-center gap-2">
                <b>Duration:</b>
                <AiOutlineFieldTime color="#444" size={20} /> {pduration}
              </p>
            </div>
          )}
          <button
            onClick={makePayment}
            className="checkout"
            style={
              auth?.token && basicprice
                ? { background: "#000" }
                : { pointerEvents: "none", background: "#777" }
            }
          >
            Continue <HiOutlineArrowNarrowRight />
          </button>
          {!auth?.token && (
            <span
              className="text-red-600 text-lg font-md mb-4 text-center cursor-pointer
          underline"
              onClick={() => navigate("/login")}
            >
              {" "}
              First Login then checkout!
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center mt-8">
        <button
          className=" text-xl text-black font-lg py-2 bg-zinc-100 
        w-full rounded-md hover:bg-zinc-200"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}
