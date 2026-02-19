import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./Api";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyPosts() {
      try {
        const res = await API.get("/post/my-posts");
        setPosts(res.data.posts);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    }
    fetchMyPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await API.delete(`/post/delete/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      alert("Failed to delete post");
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-200 to-pink-200">
      <div className="text-2xl text-gray-600 animate-pulse">Loading your posts...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-200 to-pink-200">
      <div className="text-red-600 text-xl">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-200 to-pink-200 pt-28 pb-16 px-6 md:px-16">
      <h2 className="text-3xl text-gray-700 font-bold text-center mb-2">My Blog Posts</h2>
      <p className="text-center text-gray-500 mb-10">Manage and edit your published posts</p>

      {posts.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-20">
          <p className="text-5xl mb-4">✏️</p>
          <p>You haven't written any posts yet.</p>
          <button
            onClick={() => navigate("/post")}
            className="mt-6 bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors"
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              <img
                src={post.imgurl && post.imgurl[0] ? post.imgurl[0] : "https://via.placeholder.com/400x200?text=No+Image"}
                alt={post.title}
                className="h-44 w-full object-cover"
              />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-xl text-gray-800 mb-1 line-clamp-2">{post.title}</h3>
                {post.createdAt && (
                  <p className="text-gray-400 text-xs mb-3">
                    📅 {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">#{tag}</span>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex gap-3 pt-3">
                  <button
                    onClick={() => navigate(`/editpost/${post._id}`)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this post?")) {
                        handleDelete(post._id);
                      }
                    }}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPosts;
