import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import questionReducer from "./slices/questionSlice";
import examReducer from "./slices/examSlice";
import resultReducer from "./slices/resultSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    question: questionReducer,
    exam: examReducer,
    result: resultReducer,
  },
});

export default store;
