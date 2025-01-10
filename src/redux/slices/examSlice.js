import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/authService";

// ✅ Async Thunk for Creating an Exam
export const createExam = createAsyncThunk(
  "exam/createExam",
  async (examData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/exams`, examData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating exam"
      );
    }
  }
);

// ✅ Async Thunk for Fetching All Exams
export const fetchAllExams = createAsyncThunk(
  "exam/fetchAllExams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/exams`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching exams"
      );
    }
  }
);

// ✅ New: Async Thunk for Fetching a Single Exam by ID
export const getExamById = createAsyncThunk(
  "exam/getExamById",
  async (examId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/exams/${examId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching exam by ID"
      );
    }
  }
);

// ✅ Exam Slice with Reducers and Async Thunks
const examSlice = createSlice({
  name: "exam",
  initialState: {
    exams: [],
    selectedExam: null, // ✅ Added selectedExam for storing the fetched exam by ID
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Create Exam Cases
      .addCase(createExam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exams.push(action.payload);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Fetch All Exams Cases
      .addCase(fetchAllExams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllExams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exams = action.payload;
      })
      .addCase(fetchAllExams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Fetch Exam by ID Cases
      .addCase(getExamById.pending, (state) => {
        state.status = "loading";
        state.selectedExam = null;
      })
      .addCase(getExamById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedExam = action.payload;
      })
      .addCase(getExamById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.selectedExam = null;
      });
  },
});

export default examSlice.reducer;
