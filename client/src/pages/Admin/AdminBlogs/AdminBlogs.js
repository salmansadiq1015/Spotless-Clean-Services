import React, { useEffect, useState } from "react";
import "./blog.css";
import AdminSidebar from "../../../components/AdminMenu/AdminSidebar";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { MdAddToPhotos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminBlogs() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Get ALl Blogs
  const getBlogs = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blogs/get-blog`);
      setData(data?.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // -------------Delete Blogs------------->

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/blogs/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog deleted successfully!", {
          theme: "dark",
          position: "top-center",
        });
        getBlogs();
      }
    } catch (error) {
      toast.error("Error while delete blog!", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return (
    <Layout title={"All Blogs"}>
      <div className="admin-dasboard-container relative select-none ">
        <div className="admin-sideBar">
          <AdminSidebar />
        </div>
        <div className="admin-main-container  px-2 py-4 sm:px-6 relative  ">
          <div
            className="add-blogs absolute top-3 right-3 cursor-pointer"
            onClick={() => navigate("/dashboard/admin/blogs/create-blog")}
          >
            <MdAddToPhotos size={28} />
          </div>
          <h1 className="text-white text-3xl md:text-5xl text-center mt-2 font-medium">
            All Blogs
          </h1>
          <div className="admin-blog-card mt-8">
            {data?.map((blog) => (
              <div
                className="Admin-blog-box bg-white rounded-md cursor-pointer overflow-hidden "
                key={blog._id}
              >
                <div className="image">
                  <img
                    src={`/api/v1/blogs/banner-image/${blog._id}`}
                    alt={blog?.title}
                    className="w-full h-[15rem]"
                  />
                  <div className="flex flex-col gap-3 p-2 mt-2 ">
                    <h3 className="text-black text-xl font-bold">
                      {blog?.title}...
                    </h3>
                    <p className=" truncate text-slate-600 text-sm ">
                      {blog?.shotDesc}
                    </p>
                  </div>
                  <div className="admin-blog-buttons mt-3 flex items-center justify-between p-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/dashboard/admin/blogs/update-blog/${blog._id}`
                        )
                      }
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
