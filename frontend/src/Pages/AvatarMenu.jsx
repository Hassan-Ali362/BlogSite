import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatarimg from '../assets/Pictures/avatar.jpg'

function AvatarMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);  

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <img
        src={avatarimg}
        alt="User Avatar"
        className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute right-0 mt-2 w-41 shadow-lg rounded-lg border z-50 bg-gray-100">
          <button
            onClick={() => {
              navigate("/uploadImage");
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-pink-400 rounded-xl text-gray-700"
          >
            📤 Upload Avatar
          </button>

          <button
            onClick={() => {
              navigate("/post");
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-pink-400 rounded-xl text-gray-700"
          >
            ✏ Create Post
          </button>

          <button
            onClick={() => {
              navigate(`/my-posts`);
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-pink-400 rounded-xl text-gray-700"
          >
            📄 My Posts
          </button>
        </div>
      )}
    </div>
  );
}

export default AvatarMenu;
