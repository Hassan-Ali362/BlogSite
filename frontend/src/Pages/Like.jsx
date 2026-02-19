import { useState } from "react";
import API from "./Api";

function Like({ postId, initialLikes, initiallyLiked }) {
    const [likesCount, setLikesCount] = useState(initialLikes || 0);
    const [liked, setLiked] = useState(initiallyLiked || false);
    const [loading, setLoading] = useState(false);

    const handleLikes = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await API.put(`/post/like/${postId}`, {});
            if (res.data.success) {
                setLiked((prev) => !prev);
                setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
            }
        } catch (error) {
            console.log("Like error", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLikes}
            disabled={loading}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-lg transition-all shadow-sm
        ${liked
                    ? "bg-pink-100 text-pink-600 border-2 border-pink-400 hover:bg-pink-200"
                    : "bg-gray-100 text-gray-600 border-2 border-gray-300 hover:bg-gray-200"
                } disabled:opacity-60`}
        >
            <span className="text-2xl">{liked ? "❤️" : "🤍"}</span>
            <span>{likesCount} {likesCount === 1 ? "Like" : "Likes"}</span>
        </button>
    );
}

export default Like;
