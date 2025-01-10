import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/authService";

// ✅ Async Thunk for Creating a New Question
export const createQuestion = createAsyncThunk(
  "question/createQuestion",
  async (questionData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/questions`, questionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add question"
      );
    }
  }
);

// ✅ Async Thunk for Fetching All Questions
export const fetchAllQuestions = createAsyncThunk(
  "question/fetchAllQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/questions`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch questions"
      );
    }
  }
);

// ✅ Redux Slice Setup
const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Create Question Cases
      .addCase(createQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions.push(action.payload);
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Fetch All Questions Cases
      .addCase(fetchAllQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default questionSlice.reducer;
