import Posts from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const newPost = await Posts({ userId, content });

    await newPost.save();

    return res.status(200).json({ messege: "Post created successfully..." });
  } catch (e) {
    return res.status(500).json({ messege: "Something went wrong..." });
  }
};
