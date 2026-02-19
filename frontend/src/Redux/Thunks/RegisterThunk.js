import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './AxiosInstance';
import { toast } from 'react-toastify';

const registerThunk = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/user/register', userData);
      toast.success("Register Successfully!");
      return res.data;
    } 
    catch (err) {
      toast.error("Register Failed");
      return rejectWithValue(err.response?.data?.message || err.response?.data?.msg || "Register Failed from frontend");
    }
  }
);

export default registerThunk;
