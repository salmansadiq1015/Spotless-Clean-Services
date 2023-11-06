import React, { useEffect, useRef, useState } from "react";
import "./admin.css";
import { toast } from "react-toastify";
import axios from "axios";
import JoditEditor from "jodit-react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

export default function UpdateServices({ getServices, setUshow, sid }) {
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [description, setDescription] = useState("");
  const [basicprice, setBasicPrice] = useState("");
  const [standardprice, setStandardPrice] = useState("");
  const [premiumprice, setPremiumPrice] = useState("");
  const [bduration, setBduration] = useState("");
  const [sduration, setSduration] = useState("");
  const [pduration, setpDuration] = useState("");
  const [photo, setPhoto] = useState("");
  const editor = useRef(null);

  //   Get Single Service
  const singleService = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/service/single-service/${sid}`
      );
      setName(data?.service?.name);
      setPlan(data?.service?.plan);
      setDescription(data?.service?.description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    singleService();

    // eslint-disable-next-line
  }, []);

  // Update Service
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const serviceData = new FormData();
      serviceData.append("name", name);
      serviceData.append("plan", plan);
      serviceData.append("description", description);
      serviceData.append("photo", photo);
      serviceData.append("basicprice", basicprice);
      serviceData.append("standardprice", standardprice);
      serviceData.append("premiumprice", premiumprice);
      serviceData.append("bduration", bduration);
      serviceData.append("sduration", sduration);
      serviceData.append("pduration", pduration);
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/service/update-service/${sid}`,
        serviceData
      );
      getServices();
      if (data?.success) {
        getServices();
        setUshow(false);
        toast.success("Service updated successfully!", {
          theme: "dark",
          position: "top-center",
        });
      } else {
        toast.error(data?.message, { theme: "dark", position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="add-services-container " style={{ zIndex: "12120" }}>
      <div className="Add-form relative">
        <AiFillCloseCircle
          color="orangered"
          size={30}
          className="absolute top-3 right-3"
          onClick={() => setUshow(false)}
        />
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bolder",
            color: "#01271d",
            fontFamily: "'Croissant One', cursive",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Update Service
        </h1>
        <form onSubmit={handleForm}>
          <input
            type="text"
            placeholder="Service Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Basic Price"
            required
            value={basicprice}
            onChange={(e) => setBasicPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Standard Price"
            required
            value={standardprice}
            onChange={(e) => setStandardPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Premium Price"
            required
            value={premiumprice}
            onChange={(e) => setPremiumPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Basic Duration"
            required
            value={bduration}
            onChange={(e) => setBduration(e.target.value)}
          />
          <input
            type="text"
            placeholder="Standard Duration"
            required
            value={sduration}
            onChange={(e) => setSduration(e.target.value)}
          />
          <input
            type="text"
            placeholder="Premium Duration"
            required
            value={pduration}
            onChange={(e) => setpDuration(e.target.value)}
          />
          <input
            type="text"
            placeholder="Shot description"
            required
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          />
          <div className="cover-photo-container mb-4">
            {photo ? (
              <AiOutlineCloseCircle onClick={() => setPhoto("")} />
            ) : (
              <div className="cover-image">
                <label
                  htmlFor="coverImage"
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: ".5rem",
                    color: "orangered",
                  }}
                >
                  <BsFillImageFill />
                </label>
              </div>
            )}
            <input
              type="file"
              required
              id="coverImage"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              style={{ display: "none" }}
            />
            {photo ? (
              <div className="cover-image">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="cover_image"
                  className="img img-responsive"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ) : (
              <img
                src={`http://localhost:5000/api/v1/service/service-route/${sid}`}
                alt="cover_image"
                className="img img-responsive"
              />
            )}
          </div>
          <JoditEditor
            ref={editor}
            placeholder="Description..."
            value={description}
            required
            onChange={(newContent) => setDescription(newContent)}
          />
          <button
            className="btn mt-4 float-right hover:text-teal-50"
            onClick={handleForm}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
