import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { userId, postId, parentId, content } = req.body;

    const newComment = new Comment({ userId, postId, parentId, content });

    await newComment.save();

    return res.status(200).json({ messege: "Comment is added successfull..." });
  } catch (e) {
    return res.status(500).json({ messege: "Something went wrong..." });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    console.log(req.params);

    const comments = await Comment.find({ postId, parentId: null }).lean();

    for (let comment of comments) {
      comment.replies = await getReplies(comment._id);
    }

    return res.status(200).json({ comments: comments });
  } catch (e) {
    return res.status(500).json({ messege: "Something went wrong..." });
  }
};

const getReplies = async (parentId) => {
  try {
    const replies = await Comment.find({ parentId }).lean();

    for (let reply of replies) {
      reply.replies = await getReplies(reply._id);
    }

    return replies;
  } catch (e) {
    return e;
  }
};
