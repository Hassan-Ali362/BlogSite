import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import API from "./Api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: [],
    imgurl: [""],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await API.get(`/post/get/${id}`);
        const data = res.data.post;
        setPost({
          title: data.title || "",
          content: data.content || "",
          tags: data.tags || [],
          imgurl: data.imgurl && data.imgurl.length > 0 ? data.imgurl : [""],
        });
        setTagInput((data.tags || []).join(", "));
        setLoading(false);
      } catch (error) {
        setError("Failed to load post.");
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "imgurl") {
      setPost((prev) => ({ ...prev, imgurl: [value] }));
    } else {
      setPost((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagsChange = (e) => {
    setTagInput(e.target.value);
    setPost((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await API.put(`/post/update/${id}`, post);
      navigate("/my-posts");
    } catch (error) {
      setError("Failed to update post.");
      console.log(error);
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-200 to-pink-200">
      <div className="text-2xl text-gray-600 animate-pulse">Loading post...</div>
    </div>
  );

  if (error) return <div className="text-red-600 text-center pt-32">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-300 to-pink-300 pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-700 text-center">Edit Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Post title..."
              value={post.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-2xl font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Cover Image URL</label>
            <input
              type="text"
              name="imgurl"
              placeholder="https://..."
              value={post.imgurl[0] || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
            />
            {post.imgurl[0] && (
              <img src={post.imgurl[0]} alt="preview" className="mt-3 h-48 w-full object-cover rounded-xl" />
            )}
          </div>

          {/* Rich Text Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Content</label>
            <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={(newContent) => setPost((prev) => ({ ...prev, content: newContent }))}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              placeholder="react, javascript, webdev"
              value={tagInput}
              onChange={handleTagsChange}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
            />
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags.map((tag, i) => (
                  <span key={i} className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-3 rounded-xl font-semibold text-lg transition-colors cursor-pointer"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
