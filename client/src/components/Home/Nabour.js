import React from "react";
import { ChevronRightCircle } from "lucide-react";

export default function Nabour() {
  return (
    <div className="home-neighbor-wrapper">
      <div className="h-neighbor-container">
        <div className="image">
          <img src="/nabour.webp" alt="..." />
        </div>
        <div className="neighbor-content flex flex-col gap-4">
          <h2 className="text-4xl font-extrabold text-green-900 ">
            Neighborly®
          </h2>
          <p className="text-justify text-md ">
            <b>Molly Maid is proud to be a Neighborly company.</b> We're part of
            a network of home service professionals who offer trusted, friendly
            and fast home services for your entire home. From plumbing to
            electrical, appliance repair to handyman service, Neighborly has you
            covered.
            <div className="neighbot-btn ">
              <button className="mt-4 flex gap-3 items-center hover:text-green-800 font-bold text-xl">
                <ChevronRightCircle /> Learn More About Neighborly
              </button>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}
