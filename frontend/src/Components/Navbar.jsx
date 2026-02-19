import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutThunk from "../Redux/Thunks/LogoutThunk";
import AvatarMenu from "../Pages/AvatarMenu";
import { toast } from "react-toastify";

function Navbar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.login);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/explore?q=${encodeURIComponent(input.trim())}`);
      setInput("");
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(LogoutThunk())
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Logout Failed");
        console.error("Logout failed:", err);
      });
  };

  return (
    <nav className="fixed top-0 w-full bg-blue-900 text-white z-50 shadow-md">
      <div className="flex justify-between items-center p-4 md:px-10">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-pink-300 transition-colors">
          BLOGS
        </Link>

        <ul className="hidden md:flex gap-6 text-[17px] items-center">
          <li>
            <Link to="/" className="hover:text-pink-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/explore" className="hover:text-pink-300 transition-colors">
              Explore
            </Link>
          </li>

          {/* Search form */}
          <li>
            <form onSubmit={handleSearch} className="flex items-center gap-1">
              <input
                type="text"
                placeholder="Search posts..."
                id="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="outline-none bg-white border-none text-gray-800 rounded-xl px-3 py-1.5 text-sm w-44"
              />
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-400 text-white px-3 py-1.5 rounded-xl text-sm transition-colors"
              >
                🔍
              </button>
            </form>
          </li>
        </ul>

        {userInfo ? (
          <div className="flex flex-row gap-4 items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 ring-2 ring-gray-300">
              <AvatarMenu />
            </div>
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 bg-pink-500 hover:bg-pink-400 px-4 py-2 rounded-xl cursor-pointer transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <ul className="flex flex-row gap-3 items-center">
            <li>
              <Link
                to="/register"
                className="hover:bg-pink-400 bg-pink-500 px-4 py-2 rounded-xl transition-colors"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:bg-pink-400 bg-pink-500 px-4 py-2 rounded-xl transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
