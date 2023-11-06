import contactModel from "../models/contactModel.js";

// Create Contact
export const createContactController = async (req, res) => {
  try {
    const { city, country, email, phone, telephone } = req.body;

    const contact = await new contactModel({
      city,
      country,
      email,
      phone,
      telephone,
    }).save();

    res.status(200).send({
      success: true,
      message: "Contact created successfully!",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating contact!",
      error,
    });
  }
};

// Get Contact
export const getContactController = async (req, res) => {
  try {
    const contact = await contactModel.find({});
    res.status(200).send({
      success: true,
      message: "Contact information!",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting contact!",
      error,
    });
  }
};

//   Update Contact
export const updateContactController = async (req, res) => {
  try {
    const { city, country, email, phone, telephone } = req.body;

    const contact = await contactModel.findByIdAndUpdate(
      req.params.id,
      {
        city,
        country,
        email,
        phone,
        telephone,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Contact update successfully!",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating contact!",
      error,
    });
  }
};
