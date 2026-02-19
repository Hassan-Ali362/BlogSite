import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./AxiosInstance";
import { toast } from "react-toastify";

const LoginThunk = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", userData);
      toast.success("Login successful!");

      return res.data;
    } 
    catch (err) {
      toast.error("Login Failed");
      return rejectWithValue(err.response?.data?.msg || "Login failed from Frontend"); // this msg keywork should be exact like as written in backend
    }
  }
);

export default LoginThunk;
