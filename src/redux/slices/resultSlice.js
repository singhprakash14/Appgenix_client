import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/authService";

// ✅ Async Thunk for Creating a Result
export const createResult = createAsyncThunk(
  "result/createResult",
  async (resultData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/results`, resultData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating result"
      );
    }
  }
);

// ✅ Async Thunk for Fetching All Results
export const fetchAllResults = createAsyncThunk(
  "result/fetchAllResults",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/results`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching results"
      );
    }
  }
);

// ✅ Async Thunk for Fetching Result by Student ID
export const fetchResultByStudent = createAsyncThunk(
  "result/fetchResultByStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/results/student/${studentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching student result"
      );
    }
  }
);

// ✅ Async Thunk for Deleting a Result
export const deleteResult = createAsyncThunk(
  "result/deleteResult",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/results/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting result"
      );
    }
  }
);

const resultSlice = createSlice({
  name: "result",
  initialState: {
    results: [],
    selectedResult: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createResult.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createResult.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results.push(action.payload);
      })
      .addCase(createResult.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchAllResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchResultByStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedResult = action.payload;
      })
      .addCase(deleteResult.fulfilled, (state, action) => {
        state.results = state.results.filter(
          (result) => result._id !== action.payload
        );
      });
  },
});

export default resultSlice.reducer;
