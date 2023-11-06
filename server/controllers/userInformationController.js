import userMessage from "../models/userMessage.js";

// Port-Information-Controller
export const createInformationController = async (req, res) => {
  try {
    const { name, email, phone, zip, messages } = req.body;

    // Validation
    if (!name || !email || !phone || !zip || !messages) {
      return res
        .status(401)
        .send({ message: "Please fill all the fields correctly!" });
    }

    // Existing
    const existing = await userMessage.findOne({ email });
    if (existing) {
      return res
        .status(201)
        .send({ message: "You can send message again after 24 Hours!" });
    }

    // Save
    const information = await new userMessage({
      name,
      email,
      phone,
      zip,
      messages,
    }).save();
    res.status(200).send({
      success: true,
      message: "Information send successfully!",
      information,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error while creating user!",
      error,
    });
  }
};

// Get-Information-Controller
export const getInformationController = async (req, res) => {
  try {
    const information = await userMessage.find({});
    res.status(200).send({
      total: information.length,
      success: true,
      message: "All users Information ",
      information,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error while get user information!",
      error,
    });
  }
};

// Delete-Information-Controller
export const deleteInformationController = async (req, res) => {
  try {
    const information = await userMessage.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Information delete successfully! ",
      information,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error while delete user information!",
      error,
    });
  }
};
