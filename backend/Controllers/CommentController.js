import Comment from "../Models/CommentModel.js";
import Post from "../Models/PostModel.js";

const addComment = async (req, res) => {
  const { content } = req.body;
  const author = req.id;
  const postId = req.params.postId;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(400).json({ success: false, msg: "Post not found" });
  }

  const comment = await Comment.create({ content, author, post: postId });
  await comment.populate("author", "username");    // this populate must be used as in model author is id of that person, so we use populate to show any other thing of that author direct without refresh. 
  // populate() in Mongoose is used to replace a referenced document’s ID with the actual document data from another collection.

  res.status(200).json({ success: true, msg: comment });
}

const getCommentsByPost = async (req, res) => {
  const postId = req.params.postId;

  const comments = await Comment.find({ post: postId }).populate("author", "username").sort({ createdAt: -1 });

  return res.status(200).json({ success: true, msg: comments });
}


const deleteComment = async (req, res) => {

  const comment = req.params.commentId;

  if (!comment) return res.status(404).json({ success: false, msg: "Comment not found" });

  await Comment.findByIdAndDelete(comment);

  res.status(200).json({ success: true, msg: "Comment Deleted" });
}

export { addComment, getCommentsByPost, deleteComment };

