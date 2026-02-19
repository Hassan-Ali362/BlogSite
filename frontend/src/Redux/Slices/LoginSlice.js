import loginThunk from "../Thunks/LoginThunk";
import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.success = false;
      localStorage.removeItem("user"); //--> clear storage too
    },
    resetLoginState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.success = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { logout, resetLoginState } = LoginSlice.actions;
export default LoginSlice.reducer;
