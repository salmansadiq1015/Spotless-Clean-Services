import newsModel from "../models/newsModel.js";

// Create News Controller
export const createNewsController = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(401).send({ message: "Email is required" });
    }

    // Check Existing mail
    const existing = await newsModel.findOne({ email });
    if (existing) {
      return res.status(201).send({
        success: false,
        message: "This email is already registered for subscription!",
      });
    }

    // Save
    const news = await new newsModel({ email }).save();

    res.status(200).send({
      success: true,
      message: "Email send successfully!",
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while subscription",
      error,
    });
  }
};

// Get News Controller
export const getNewsController = async (req, res) => {
  try {
    const news = await newsModel.find({});
    res.status(200).send({
      success: true,
      message: "News email eists!",
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get all emails",
      error,
    });
  }
};

// Delete News Controller
export const deleteNewsController = async (req, res) => {
  try {
    const news = await newsModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Email delete successfully!",
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while delete email!",
      error,
    });
  }
};
