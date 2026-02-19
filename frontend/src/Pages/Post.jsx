import API from "./Api";
import UploadImage from "./UploadImage";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

function Post() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [imgurl, setImgUrl] = useState("");

  const handleTagsInput = (e) => {
    if ((e.key === "Enter") && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      } else {
        setTagInput("");
      }
    }
  };

  
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };


  const handleSubmit = async (e) => {
      e.preventDefault(); // 

    if (!title || !content ) {
      alert("Please Fill all the things");
      return;
    }

    try {
      const res = await API.post(
        "/post/create",
        {
          title,
          content,
          tags,
          imgurl: [imgurl], 
        }
      );

      if (res.data.success) {
        alert("Post created!");
        window.location.href = "/explore";   // or use navigate
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create post");
    }
  };

  return (
    <>
      <div className="w-full bg-gradient-to-tr from-blue-300 to-pink-300 pt-30 min-h-screen pb-15">
        
        <div className="flex flex-col items-center justify-center">
        <h1 className="text-gray-700 font-bold text-2xl mb-5">
          Create Your Post
        </h1>
        <UploadImage setImgUrl={setImgUrl}/>  
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mx-auto flex flex-col items-center justify-center">

            <div className="flex flex-row gap-10 items-center justify-center mb-5">
              <label
                htmlFor="title"
                className="hover:text-gray-300 bg-blue-900 p-2 rounded-xl text-white"
              >
                Title
              </label>
              <input
                type="text"
                placeholder=""
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="text-4xl font-bold w-170 border border-gray-700 outline-none p-2 rounded-xl text-gray-700 bg-white"
              />
            </div>

            <div className="w-250 bg-white rounded-2xl p-2 shadow-md">
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>

            {/* for writting tags */}
            <div className="flex flex-row gap-10 items-center mt-8">
              <label
                htmlFor="tags"
                className=" hover:text-gray-300 bg-blue-900 p-2 rounded-xl text-white"
              >
                Add Tags
              </label>
              <input
                type="text"
                name="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagsInput}
                placeholder="Enter tag and press enter"
                className="w-168 mt-2 p-2 border rounded-md outline-none border-gray-700 bg-white"
              />
            </div>

            {/* tag chips */}
            <div className="flex flex-row gap-3 flex-wrap w-164 ml-35 mt-1">
              {tags.map((tag, index) => (
                <span key={index} className="bg-blue-400 text-white px-3 py-1">
                  #{tag}
                  <button onClick={() => removeTag(tag)}>×</button>
                </span>
              ))}
            </div>

            <button
              className=" hover:text-gray-300 bg-pink-500 p-2 rounded-xl text-white mt-10 cursor-pointer">
              Post Your Blog
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Post;
