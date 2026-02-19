import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Comments({postId}) {

    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState("");

    const userId = useSelector((state) => state.login.userInfo?.user_Id);

    useEffect(()=> {
        const fetchComments = async () =>{
            try{
                const res = await axios.get(`http://localhost:3000/api/comment/${postId}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                if(res.data.success){
                    setComments(res.data.msg)
                }
            }
            catch(error){
            console.error("Error fetching comments:", error);
            }
        }
        fetchComments();
    }, [postId])


    const addComment = async () => {
        if(!newComment.trim()) return;

        try {
            const res = await axios.post(`http://localhost:3000/api/comment/${postId}`, {content: newComment}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if(res.data.success){
                setComments([res.data.msg, ...comments]);
                setNewComment("");
                console.log(res.data.msg);
            }
            } catch (error) {
              console.log("Error: ", error);
        }
    }


    const deleteComment = async (commentId) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/comment/${commentId}`,
                {
                    withCredentials: true
                }
            )
            if(res.data.success){
                setComments(comments.filter((cmt) => cmt._id !== commentId))
            }
        } 
        catch (error) {
            console.log("Error in deleting comment: " , error);
        }
    }

    return(
    <div className="comments-section w-[70%]">
      <h3 className='font-bold text-2xl mb-3 text-gray-700'>Comments</h3>
      
      <div className="add-comment">
        <textarea
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addComment}
          className="mt-2 bg-pink-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Post Comment
        </button>
      </div>


      <ul className="mt-4 space-y-3 w-full">
        {comments.length === 0 && <li>No comments yet.</li>}
        {comments.map((comment) => (
          <li key={comment._id} className="border p-3 rounded relative">
            <p className="font-semibold text-white bg-gray-500 inline rounded-2xl p-1 px-4">{comment.author.username}</p>
            <p className='mt-3'>{comment.content}</p>
            <small className="text-gray-500">{new Date(comment.createdAt).toLocaleString()}</small>

        
            {comment.author._id ==  userId && (
              <button
                onClick={() => deleteComment(comment._id)}
                className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-xl"
                title="Delete comment"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
