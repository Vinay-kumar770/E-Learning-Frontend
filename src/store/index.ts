import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";

const store = configureStore({
  reducer: {
    course: courseReducer, // ✅ Redux Toolkit Reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
