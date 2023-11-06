import fs from "fs";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

// Register-Controller
export const createAuthController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer, role } = req.fields;
    const { photo, cover } = req.files;

    // Validations
    if (!name) {
      return res.status(404).send({ message: "Name is required!" });
    }
    if (!email) {
      return res.status(404).send({ message: "Email is required!" });
    }
    if (!password) {
      return res.status(404).send({ message: "Password is required!" });
    }
    if (!phone) {
      return res.status(404).send({ message: "Phone is required!" });
    }
    if (!address) {
      return res.status(404).send({ message: "Address is required!" });
    }
    if (!answer) {
      return res.status(404).send({ message: "Answer is required!" });
    }
    if (!photo && photo.size > 10000000) {
      return res.status(404).send({
        message: "Photo is required and it's size should be less then 1 MB!",
      });
    }
    if (!cover && cover.size > 10000000) {
      return res.status(404).send({
        message:
          "Cover photo is required and it's size should be less then 1 MB!",
      });
    }

    // Existing User
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(201).send({
        success: false,
        message: "This email is already registered!",
      });
    }

    // Hashed Password
    const hashedPassword = await hashPassword(password);

    // SaveUser
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
      role,
    });
    if (photo) {
      user.photo.data = fs.readFileSync(photo.path);
      user.photo.contentType = photo.type;
    }
    if (cover) {
      user.cover.data = fs.readFileSync(cover.path);
      user.cover.contentType = cover.type;
    }
    await user.save();

    res.status(200).send({
      success: true,
      message: "User created successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating user!",
      error,
    });
  }
};

// Login Controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email) {
      return res.status(404).send({ message: "Email is required!" });
    }
    if (!password) {
      return res.status(404).send({ message: "Password is required!" });
    }

    // Check User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "This email is not registered!",
      });
    }

    // Compare Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(201).send({
        success: false,
        message: "Invalid Password!",
      });
    }

    // Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while login!",
      error,
    });
  }
};

// Forgot_Password_Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;

    // Validation
    if (!email) {
      return res.status(400).send({ message: "Email is required!" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required!" });
    }
    if (!newpassword) {
      return res.status(400).send({ message: "New password is required!" });
    }

    // User
    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Wrong Email or answer!",
      });
    }

    // HashedPassword
    const hashed = await hashPassword(newpassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while forgot password!",
      error,
    });
  }
};

// Update Profile Controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, phone, address, answer } = req.fields;
    const { photo, cover } = req.files;
    // Find User
    const user = await userModel.findById(req.params.id);

    // Update
    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        phone: phone || user.phone,
        address: address || user.address,
        answer: answer || user.answer,
      },
      { new: true }
    );
    if (photo) {
      updateUser.photo.data = fs.readFileSync(photo.path);
      updateUser.photo.contentType = photo.type;
    }
    if (cover) {
      updateUser.cover.data = fs.readFileSync(cover.path);
      updateUser.cover.contentType = cover.type;
    }
    await updateUser.save();

    res.status(200).send({
      success: true,
      message: "Profile updated successfully!",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while update profile!",
      error,
    });
  }
};

// Get All Users
export const allUserController = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-cover -photo");
    res.status(200).send({
      total: users.length,
      success: true,
      message: "All users list",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while update profile!",
      error,
    });
  }
};

// Get Single User
export const singleUserController = async (req, res) => {
  try {
    const users = await userModel.findById(req.params.id);
    res.status(200).send({
      total: users.length,
      success: true,
      message: "Single User!",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting single profile!",
      error,
    });
  }
};

// Delete-User-Controller
export const deleteUserController = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "User deleted successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "User deleted successfully",
    });
  }
};

// userPhotoController
export const userPhotoController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("photo");
    if (user.photo.data) {
      res.set("Content-type", user.photo.contentType);
      res.status(200).send(user.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting profile image!",
      error,
    });
  }
};

// User CoverImage
export const userCoverController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("cover");
    if (user.cover.data) {
      res.set("Content-type", user.cover.contentType);
      res.status(200).send(user.cover.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting profile image!",
      error,
    });
  }
};
