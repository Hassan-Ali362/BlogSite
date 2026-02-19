import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "./Api";
import Comments from "./Comments";
import Like from "./Like";

function PostShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/post/get/${id}`);
        setBlog(res.data.post);
      } catch (error) {
        console.log("Error is: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-200 to-pink-200">
      <div className="text-2xl text-gray-600 animate-pulse">Loading post...</div>
    </div>
  );

  if (!blog) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500 text-xl">Post not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-200 to-pink-200 pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Post Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="font-bold text-4xl text-gray-800 mb-4 leading-tight">{blog.title}</h1>

          {/* Meta info: author + date */}
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
            <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-medium">
              ✍️ {blog.author?.username || "Unknown"}
            </span>
            {blog.createdAt && (
              <span>📅 {new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            )}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, i) => (
                <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">#{tag}</span>
              ))}
            </div>
          )}

          {/* Cover Image */}
          {blog.imgurl && blog.imgurl[0] && (
            <img
              src={blog.imgurl[0]}
              alt={blog.title}
              className="w-full h-80 object-cover rounded-xl mb-8 shadow-md"
            />
          )}

          {/* Content rendered as HTML (from Jodit rich text editor) */}
          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Like + Comments */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
            <Like postId={blog._id} initialLikes={blog.likesCount} initiallyLiked={blog.likedByUser} />
          </div>
          <Comments postId={blog._id} />
        </div>
      </div>
    </div>
  );
}

export default PostShowPage;
