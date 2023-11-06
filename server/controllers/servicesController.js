import servicesModel from "../models/servicesModel.js";
import fs from "fs";

// Create Services
export const createServicesController = async (req, res) => {
  try {
    const {
      name,
      plan,
      description,
      basicprice,
      standardprice,
      premiumprice,
      bduration,
      sduration,
      pduration,
    } = req.fields;
    const { photo } = req.files;

    // Validation
    if (!name || !plan) {
      return res.status(401).send({ message: "Name and plan is required!" });
    }
    if (!description) {
      return res.status(401).send({ message: "Description is required!" });
    }
    if (!basicprice || !standardprice || !premiumprice) {
      return res
        .status(401)
        .send({ message: "All price fields are required!" });
    }
    if (!bduration || !sduration || !pduration) {
      return res
        .status(401)
        .send({ message: "All duration fields are required!" });
    }
    if (!photo || photo.size > 1000000) {
      return res.status(401).send({
        message: "Photo is required and it size will be less then 1 MB!",
      });
    }

    // Existing Services
    const existing = await servicesModel.findOne({ name });
    if (existing) {
      return res
        .status(201)
        .send({ success: false, message: "Service is already exist!" });
    }

    // save
    const services = new servicesModel({
      name,
      plan,
      description,
      basicprice,
      standardprice,
      premiumprice,
      bduration,
      sduration,
      pduration,
    });
    if (photo) {
      services.photo.data = fs.readFileSync(photo.path);
      services.photo.contentType = photo.type;
    }
    await services.save();

    res.status(200).send({
      success: true,
      message: "Service created successfully!",
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating services!",
      error,
    });
  }
};

// Get All Services
export const getServicesController = async (req, res) => {
  try {
    const services = await servicesModel.find({}).select("-photo");
    res.status(200).send({
      total: services.length,
      success: true,
      message: "All services list!",
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all services!",
      error,
    });
  }
};

// Update Services
export const updateServicesController = async (req, res) => {
  try {
    const {
      name,
      plan,
      description,
      basicprice,
      standardprice,
      premiumprice,
      bduration,
      sduration,
      pduration,
    } = req.fields;
    const { photo } = req.files;

    // Validation
    if (!name || !plan) {
      return res.status(401).send({ message: "name and plan is required" });
    }
    if (!description) {
      return res.status(401).send({ message: "Description is required" });
    }
    const service = await servicesModel.findById(req.params.id);

    // Update
    const services = await servicesModel.findByIdAndUpdate(
      req.params.id,
      {
        name: name || service.name,
        plan: plan || service.plan,
        description: description || service.description,
        basicprice: basicprice || service.basicprice,
        standardprice: standardprice || service.standardprice,
        premiumprice: premiumprice || service.premiumprice,
        bduration: bduration || service.name,
        sduration: sduration || service.sduration,
        pduration: pduration || service.pduration,
      },
      { new: true }
    );
    if (photo) {
      services.photo.data = fs.readFileSync(photo.path);
      services.photo.contentType = photo.type;
    }
    await services.save();
    res.status(200).send({
      success: true,
      message: "Service updated successfully!",
      services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updated services!",
      error,
    });
  }
};

// Delete Services
export const deleteServicesController = async (req, res) => {
  const service = await servicesModel
    .findByIdAndDelete(req.params.id)
    .select("-photo");
  try {
    res.status(200).send({
      success: true,
      message: "Service deleted successfully!",
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting services!",
      error,
    });
  }
};

// Get Single Services
export const singleServicesController = async (req, res) => {
  try {
    const service = await servicesModel
      .findById(req.params.id)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Single service.",
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single service!",
      error,
    });
  }
};

// Photo Controller
export const getPhotoController = async (req, res) => {
  try {
    const service = await servicesModel.findById(req.params.id).select("photo");
    if (service.photo.data) {
      res.set("Content-type", service.photo.contentType);
      res.status(200).send(service.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting  service photo!",
      error,
    });
  }
};
