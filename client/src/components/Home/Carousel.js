import React from "react";

export default function Carousel() {
  return (
    <div className="w-full h-[10rem] relative">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner object-cover">
          <div className="carousel-item active h-[45rem]">
            <img
              src="/carousel1.jpg"
              className="d-block w-100 h-[45rem]"
              alt="..."
            />
          </div>
          <div className="carousel-item object-fill h-[45rem]">
            <img
              src="/carousel2.jpg"
              className="d-block w-100 h-[45rem]"
              alt="..."
            />
          </div>
          <div className="carousel-item object-cover h-[45rem]">
            <img
              src="/carousel3.jpg"
              className="d-block w-100 h-[45rem]"
              alt="..."
            />
          </div>
          <div className="carousel-item object-cover h-[45rem]">
            <img
              src="/carousel4.jpg"
              className="d-block w-100 h-[45rem]"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
