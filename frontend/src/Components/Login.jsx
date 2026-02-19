import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginThunk from "../Redux/Thunks/LoginThunk";
import { useDispatch, useSelector } from "react-redux";
import { resetLoginState } from "../Redux/Slices/LoginSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector((state) => state.login);

  const [user, setUser] = useState({
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

  // if any error in login
  useEffect(() => {
    if (error) {
    setTimeout(()=>{
      dispatch(resetLoginState())
    },1000)
    }
  }, [error, dispatch]);


  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello login handle sbumit");

    dispatch(LoginThunk(user));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-1 md:px-4 mt-10 bg-gradient-to-tr from-blue-300 to-pink-300">
      <div className="bg-blue-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <form>
          {error && <span>{error}</span>}
          <input
            type="email"
            placeholder="Email"
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
            onChange={handleInput}
            className="w-full p-2 md:p-3  mb-6 bg-white text-gray-800 rounded outline-none"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-pink-500 hover:bg-pink-400 cursor-pointer text-white p-2 md:p-3 rounded font-semibold"
          >
            {loading ? "loading.." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-pink-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
