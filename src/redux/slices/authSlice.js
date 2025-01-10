import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { api } from "../../services/authService";

// ✅ Async Thunk for Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/users/register`, formData);

      Cookies.set("token", response.data.token, { expires: 1 });
      Cookies.set("userRole", response.data.role, { expires: 1 });
      Cookies.set("id", response.data.id, { expires: 1 });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong!"
      );
    }
  }
);

// ✅ Async Thunk for Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/users/login`, formData);
      Cookies.set("token", response.data.token, { expires: 1 });
      Cookies.set("userRole", response.data.role, { expires: 1 });
      Cookies.set("id", response.data.id, { expires: 1 });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid login credentials!"
      );
    }
  }
);

// ✅ Redux Slice Setup for Authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!Cookies.get("token"),
    userRole: Cookies.get("userRole") || null,
    status: "idle",
    error: null,
    popupMessage: "", // Popup message for success or error
    popupOpen: false, // To manage the visibility of popup
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      Cookies.remove("token");
      Cookies.remove("userRole");
    },
    showPopup: (state, action) => {
      state.popupMessage = action.payload.message;
      state.popupOpen = true;
    },
    hidePopup: (state) => {
      state.popupOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Register User Cases
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userRole = action.payload.role;
        state.error = null;
        state.status = "succeeded";
        state.popupMessage = "Registration Successful!";
        state.popupOpen = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.popupMessage = action.payload;
        state.popupOpen = true;
      })

      // ✅ Login User Cases
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userRole = action.payload.role;
        state.error = null;
        state.status = "succeeded";
        state.popupMessage = "Login Successful!";
        state.popupOpen = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.popupMessage = action.payload;
        state.popupOpen = true;
      });
  },
});

export const { logout, showPopup, hidePopup } = authSlice.actions;
export default authSlice.reducer;
