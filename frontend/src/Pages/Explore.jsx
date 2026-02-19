import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "./Api";

function Explore() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = query ? `/post/getAll?q=${encodeURIComponent(query)}` : "/post/getAll";
        const res = await API.get(url);
        setPosts(res.data.posts);
      } catch (error) {
        console.log("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-200 to-pink-200 pt-28 pb-16">
      <h1 className="font-bold text-4xl text-gray-700 text-center mb-2">
        {query ? `Results for "${query}"` : "Explore Latest Blogs"}
      </h1>
      <p className="text-center text-gray-500 mb-10">
        {query ? `Showing posts matching your search` : "Discover stories, ideas, and perspectives"}
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-2xl text-gray-500 animate-pulse">Loading posts...</div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-20">
          <p className="text-5xl mb-4">{query ? "🔍" : "📭"}</p>
          <p>{query ? `No posts found for "${query}"` : "No posts yet. Be the first to write!"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
          {posts.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
              onClick={() => navigate(`/postshow/${item._id}`, { state: item })}
            >
              <img
                src={item.imgurl && item.imgurl[0] ? item.imgurl[0] : "https://via.placeholder.com/400x200?text=No+Image"}
                alt={item.title}
                className="h-52 w-full object-cover"
              />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-3">
                  ✍️ {item.author?.username || "Unknown Author"}
                  {item.createdAt && (
                    <span className="ml-2">· {new Date(item.createdAt).toLocaleDateString()}</span>
                  )}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-row gap-2 flex-wrap mt-auto pt-3">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Explore;
