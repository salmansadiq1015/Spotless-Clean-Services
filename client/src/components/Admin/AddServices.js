import React, { useRef, useState } from "react";
import "./admin.css";
import { toast } from "react-toastify";
import axios from "axios";
import JoditEditor from "jodit-pro-react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";

export default function AddServices({ getServices, setShow }) {
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [basicprice, setBasicPrice] = useState("");
  const [standardprice, setStandardPrice] = useState("");
  const [premiumprice, setPremiumPrice] = useState("");
  const [bduration, setBduration] = useState("");
  const [sduration, setSduration] = useState("");
  const [pduration, setpDuration] = useState("");
  const editor = useRef(null);

  // Add Service
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
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/service/create-services`,
        serviceData
      );
      if (data?.success) {
        getServices();
        setShow(false);
        toast.success("Service added successfully!", {
          theme: "dark",
          position: "top-center",
        });
        setName("");
        setPhoto("");
        setPlan("");
        setDescription("");
      } else {
        toast.error(data?.message, { theme: "dark", position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="add-services-container">
      <div className="Add-form">
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
          Add New Service
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
            placeholder=" Shot description"
            required
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
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
          <div className="cover-photo-container mb-4">
            {photo ? <AiOutlineCloseCircle onClick={() => setPhoto("")} /> : ""}
            <input
              type="file"
              required
              id="coverImage"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              style={{ display: "none" }}
            />
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="cover_image"
                className="img img-responsive"
              />
            ) : (
              <div className="cover-image">
                <label htmlFor="coverImage">
                  <BsFillImageFill />
                  Upload Cover Image
                </label>
              </div>
            )}
          </div>
          <JoditEditor
            ref={editor}
            placeholder="Description..."
            value={description}
            required
            tabIndex={100}
            onChange={(newContent) => setDescription(newContent)}
          />
          <button className="btn mt-4 float-right">Submit</button>
        </form>
      </div>
    </div>
  );
}
