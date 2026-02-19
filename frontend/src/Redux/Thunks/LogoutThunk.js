import { createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from '../Slices/LoginSlice';
import axiosInstance from './AxiosInstance';
import { toast } from 'react-toastify';

const LogoutThunk = createAsyncThunk(
  'user/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.post("/user/logout");
      dispatch(logout());
      toast.success("Logout Successfully");
      return { success: true }
    } 
    catch (err) {
      toast.error("Logout Failed");
      return rejectWithValue(err.response?.data?.msg || "Logout failed from Frontend");
    }
  }
);

export default LogoutThunk;