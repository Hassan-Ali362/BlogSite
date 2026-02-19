import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import registerThunk from "../Redux/Thunks/registerThunk";
import { useNavigate } from "react-router-dom";

function Register() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector((state) => state.register); 

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",   
  });

  const handleInput = (e) => { 
    const name = e.target.name;
    const value = e.target.value;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerThunk(user));
  };

  
  useEffect(() => {
      if (userInfo) navigate("/login");
  }, [navigate, userInfo]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:mt-10 mt-10 bg-gradient-to-tr from-blue-300 to-pink-300">
      <div className="bg-blue-900 p-4 md:p-8 rounded-2xl shadow-lg w-full max-w-md md:">
        <h2 className="text-white text-3xl font-bold mb-5 md:mb-6 text-center">
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            value={user.username}
            onChange={handleInput}
            className="w-full p-2 md:p-3 mb-4 bg-white text-gray-800 rounded outline-none"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            className="w-full p-2 md:p-3 mb-4 bg-white text-gray-800 rounded outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            id="password"
            onChange={handleInput}
            className="w-full p-2 md:p-3 mb-6 bg-white text-gray-800 rounded outline-none"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled= {loading}
            className="w-full bg-pink-500 hover:bg-pink-400 text-white p-2 md:p-3 rounded font-semibold"
          >
            {loading? "Registering....":"Register"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
