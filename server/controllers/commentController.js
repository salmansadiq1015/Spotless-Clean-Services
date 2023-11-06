import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";

export const createCommentController = async (req, res) => {
  try {
    const { userId, comment, stars } = req.body;

    // Check user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    const comments = await new commentModel({
      user: user?.name,
      uid: userId,
      comment,
      stars,
    });
    await comments.save();

    res.status(200).send({
      success: true,
      message: "Comment send successfully",
      comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while post comment!",
      error,
    });
  }
};

// Get Comment
export const getCommentController = async (req, res) => {
  try {
    const comments = await commentModel.find({});
    res.status(200).send({
      success: true,
      message: "Comment List!",
      comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get commment!",
      error,
    });
  }
};

//   Delete Comment
export const deleteCommentController = async (req, res) => {
  try {
    const comments = await commentModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Comment deleted successfully",
      comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting comment!",
      error,
    });
  }
};
