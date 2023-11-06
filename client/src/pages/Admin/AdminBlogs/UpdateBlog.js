import React, { useEffect, useRef, useState } from "react";
import "./blog.css";
import Layout from "../../../components/Layout/Layout";
import { toast } from "react-toastify";
import AdminSidebar from "../../../components/AdminMenu/AdminSidebar";
import JoditEditor from "jodit-pro-react";
import { BiSolidImageAdd } from "react-icons/bi";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBlog() {
  const params = useParams();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [shotDesc, setShotDesc] = useState("");
  const [description, setDescription] = useState("");
  const [auth, setAuth] = useState("");
  const [photo, setPhoto] = useState("");
  const [banner, setBanner] = useState("");

  const navigate = useNavigate();

  //   Get Single Blog

  const singleBlog = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/blogs/single-blog/${params.id}`
      );
      setTitle(data?.blog?.title);
      setDescription(data?.blog?.description);
      setAuth(data?.blog?.auth);
      setShotDesc(data?.blog?.shotDesc);
      //   setPhoto(data?.blog?.photo);
      //   setBanner(data?.blog?.banner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    singleBlog();

    //eslint-disable-next-line
  }, []);

  //   Create Blog
  const handleBlog = async (e) => {
    e.preventDefault();
    try {
      const blogData = new FormData();
      blogData.append("title", title);
      blogData.append("shotDesc", shotDesc);
      blogData.append("description", description);
      blogData.append("auth", auth);
      blogData.append("photo", photo);
      blogData.append("banner", banner);

      const { data } = await axios.put(
        `/api/v1/blogs/update-blog/${params.id}`,
        blogData
      );
      if (data?.success) {
        toast.success(data?.message, {
          position: "top-center",
          theme: "dark",
        });
        navigate("/dashboard/admin/blogs");
        setAuth("");
        setBanner("");
        setDescription("");
        setPhoto("");
        setShotDesc("");
        setTitle("");
      } else {
        toast.error(data?.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Error while updating blogs", {
        theme: "colored",
        position: "top-center",
      });
    }
  };

  // Editor
  // Editor
  const config = {
    readonly: false,
    contentCss: "body { color: red; }",
    height: 750,
    width: 1000,
    color: "red",
  };

  return (
    <Layout title={"All Blogs"}>
      <div className="admin-dasboard-container relative select-none ">
        <div className="admin-sideBar">
          <AdminSidebar />
        </div>
        <div className="admin-main-container  px-2 py-4 sm:px-6">
          <h1 className="text-white text-3xl md:text-5xl text-center mt-2 font-medium">
            Update Blog
          </h1>
          <div className="add-blog-content">
            <form onSubmit={handleBlog} className="flex flex-col gap-4">
              {/* Auth Image */}

              <div className="blog-auth-image">
                {photo ? (
                  <img src={URL.createObjectURL(photo)} alt="authImage" />
                ) : (
                  <img
                    src={`/api/v1/blogs/auth-image/${params.id}`}
                    alt="authImage"
                  />
                )}
                <input
                  type="file"
                  required
                  onChange={(e) => setPhoto(e.target.files[0])}
                  id="authImage"
                  style={{ display: "none" }}
                />
                <label htmlFor="authImage">
                  <span>{photo ? "Change Photo" : "Add Photo"}</span>
                </label>
              </div>

              {/* Banner Image */}

              <div className="add-blog-banner">
                <input
                  type="file"
                  required
                  onChange={(e) => setBanner(e.target.files[0])}
                  style={{ display: "none" }}
                  id="Blog-banner"
                />
                {banner ? (
                  <div className="banner-image relative">
                    <label
                      className=" absolute top-3 left-3"
                      htmlFor="Blog-banner"
                    >
                      <BiSolidImageAdd size={28} />
                    </label>
                    <img
                      src={URL.createObjectURL(banner)}
                      alt="Banner"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 w-[100%] h-full ">
                    <label
                      htmlFor="Blog-banner"
                      className="relative flex flex-col gap-3 w-[100%] h-full cursor-pointer items-center justify-center"
                    >
                      <BiSolidImageAdd
                        size={32}
                        color="orangered"
                        className="absolute top-2 left-2 z-10"
                      />
                      <img
                        src={`/api/v1/blogs/banner-image/${params.id}`}
                        alt="Banner"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div className="inputs">
                <input
                  type="text"
                  placeholder="Auther name..."
                  required
                  value={auth}
                  onChange={(e) => setAuth(e.target.value)}
                  title="Enter Blog Title"
                />

                <input
                  type="text"
                  placeholder="Blog title..."
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  title="Enter Blog Title"
                />
              </div>
              <textarea
                placeholder="Short description..."
                required
                value={shotDesc}
                onChange={(e) => setShotDesc(e.target.value)}
                title="Enter blog short description"
              />

              <JoditEditor
                ref={editor}
                value={description}
                config={config}
                color="#fff"
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setDescription(newContent)}
              />
              <div className="updatebtn">
                <button
                  style={{
                    color: "#fff",
                    background: "green",
                    cursor: "pointer",
                    padding: ".4rem 1rem",
                    textShadow: ".2rem .3rem .3rem rgba(0,0,0,.3)",
                    borderRadius: ".3rem",
                  }}
                  className="hover:bg-green-400 transition"
                  type="submit"
                  onClick={handleBlog}
                >
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
