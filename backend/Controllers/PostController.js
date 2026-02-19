import Post from "../Models/PostModel.js";
import MyError from "../utils/error.js";

const createPost = async (req, res) => {
  const { title, content, tags, imgurl } = req.body;
  const author = req.id;

  const newPost = await Post.create({ title, content, tags, imgurl, author });

  res.status(201).json({ success: true, post: newPost });
};


const getAllPosts = async (req, res) => {
  const { q } = req.query;
  let filter = {};
  if (q) {
    const regex = new RegExp(q, "i");
    filter = { $or: [{ title: regex }, { tags: regex }] };
  }
  const posts = await Post.find(filter).populate("author", "username").sort({ createdAt: -1 });
  res.status(200).json({ success: true, posts });
};


const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username" }
      });

    if (!post) {
      return res.status(404).json({ success: false, msg: "Post not found" });
    }

    const likesCount = post.likes.length;

    // check if current logged-in user has liked the post

    let likedByUser = false;
    if (req.id) {
      likedByUser = post.likes.some(
        userId => userId.toString() === req.id.toString()
      );
    }

    res.status(200).json({
      success: true,
      post: {
        ...post.toObject(),
        likesCount,
        likedByUser
      }
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const getPostsOfUser = async (req, res) => {

  const userId = req.id;

  const posts = await Post.find({ author: userId }).populate("author", "username").sort({ createdAt: -1 });

  res.status(200).json({ success: true, posts });
}


const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ msg: "post not found" });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  )

  return res.status(200).json({ success: true, msg: updatedPost })
}


const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.stastus(404).json({ success: false, msg: "Post not found" });

  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, msg: "Post deleted" });
};


const handleLike = async (req, res, next) => {
  const blogId = req.params?.id || "";
  const userId = req.id;
  if (!blogId || !userId) throw new MyError(400, "Missing Id");

  const blog = await Post.findById(blogId);
  if (!blog) throw new MyError(400, "Blog Not Found");

  let message;
  if (blog.likes.includes(userId)) {
    // remove id (unlike)
    const newLikes = blog.likes.filter((id) => id != userId);
    blog.likes = newLikes;
    await blog.save();
    message = "Post UnLiked";
  } else {
    // add id (like)
    blog.likes.push(userId);
    if (!blog.author) blog.author = req.id;
    await blog.save();
    message = "Post Liked";
  }

  return res.status(201).json({
    status: 201,
    message,
    success: true,
  });
}

export { createPost, getAllPosts, getPostById, updatePost, deletePost, getPostsOfUser, handleLike };
