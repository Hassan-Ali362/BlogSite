import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Pages/Api";

const LikeThunk = createAsyncThunk(
    "post/like",
    async (postId, { rejectWithValue }) => {
        try {
            const res = await API.put(`/post/like/${postId}`, {});
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.msg || "Like action failed");
        }
    }
);

export default LikeThunk;
