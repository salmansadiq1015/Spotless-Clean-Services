import blogModel from "../models/blogModel.js";
import fs from "fs";

export const createBlogController = async (req, res) => {
  try {
    const { title, shotDesc, description, auth } = req.fields;
    const { photo, banner } = req.files;

    // Validation
    if (!title) {
      return res.status(401).send({ message: "Title is required!" });
    }
    if (!shotDesc) {
      return res.status(401).send({ message: "Shot description is required!" });
    }
    if (!description) {
      return res.status(401).send({ message: "Description is required!" });
    }
    if (!auth) {
      return res.status(401).send({ message: "Auth name is required!" });
    }
    if (!photo && photo.size > 100000) {
      return res
        .status(401)
        .send({ message: "Photo  is required & size will be less then 1MB!" });
    }
    if (!banner && banner.size > 100000) {
      return res
        .status(401)
        .send({ message: "Banner is required & size will be less then 1MB!" });
    }

    // Check Existing Blog
    const existingBlog = await blogModel.findOne({ title });
    if (existingBlog) {
      return res
        .status(201)
        .send({ message: "Blog of this name is already exist!" });
    }

    // Save Blog

    const blog = await new blogModel({ ...req.fields });

    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }
    if (banner) {
      blog.banner.data = fs.readFileSync(banner.path);
      blog.banner.contentType = banner.type;
    }
    await blog.save();

    res.status(200).send({
      success: true,
      message: "Blog created successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating blog!",
      error,
    });
  }
};

// Get-Blog-Controller
export const getBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).select("-photo -banner");
    res.status(200).send({
      total: blogs.length,
      success: "true",
      message: "All blogs list!",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while get all blogs!",
      error,
    });
  }
};

// Update Services Controller

export const updateBlogController = async (req, res) => {
  try {
    const { title, shotDesc, description, auth } = req.fields;
    const { photo, banner } = req.files;

    // Validation
    if (!title) {
      return res.status(401).send({ message: "Title is required!" });
    }
    if (!shotDesc) {
      return res.status(401).send({ message: "Shot description is required!" });
    }
    if (!description) {
      return res.status(401).send({ message: "Description is required!" });
    }
    if (!auth) {
      return res.status(401).send({ message: "Auth name is required!" });
    }

    // Update Blog

    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }
    if (banner) {
      blog.banner.data = fs.readFileSync(banner.path);
      blog.banner.contentType = banner.type;
    }
    await blog.save();

    res.status(200).send({
      success: true,
      message: "Blog updated successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while updating blog!",
      error,
    });
  }
};

// Delete Blog Controller

export const deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findByIdAndDelete(req.params.id)
      .select("-photo -banner");

    res.status(200).send({
      success: true,
      message: "Blog deleted successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while deleting blog!",
      error,
    });
  }
};

// Get Single Blog

export const singleBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    res.status(200).send({
      success: true,
      message: "Single Blog!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting single blog!",
      error,
    });
  }
};

// Auth-Image-Controller
export const authImageController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id).select("photo");

    if (blog.photo.data) {
      res.set("Content-type", blog.photo.contentType);
      res.status(200).send(blog.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting auth image!",
      error,
    });
  }
};

// Banner-Image-Controller
export const bannerImageController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id).select("banner");

    if (blog.banner.data) {
      res.set("Content-type", blog.banner.contentType);
      res.status(200).send(blog.banner.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting auth image!",
      error,
    });
  }
};
