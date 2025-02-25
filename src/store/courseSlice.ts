import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AuthServices from "../ApiServices/auth.service";

interface Course {
  _id: string;
  title: string;
  name: string;
}

interface CourseState {
  Courses: Course[];
  PreferenceCourse: Course[];
}

const initialState: CourseState = {
  Courses: [],
  PreferenceCourse: [],
};

// ✅ Async Thunk for Fetching All Courses
export const fetchAsyncCourses = createAsyncThunk(
  "courses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthServices.AllCourses();
      return response.data.course;
    } catch (error) {
      console.error("Error fetching courses:", error); // ✅ Fix: Use error instead of leaving it unused
      return rejectWithValue("Failed to fetch courses");
    }
  }
);

// ✅ Async Thunk for Fetching Preferred Courses
export const fetchAsyncPreferenceCourse = createAsyncThunk(
  "courses/fetchPreference",
  async (
    { CourseLink, data }: { CourseLink: string; data: Record<string, unknown> },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthServices.PreferenceCourse(CourseLink, data); // ✅ Fix: Pass second argument `data`
      return response.data.course;
    } catch (error) {
      console.error("Error fetching preference courses:", error); // ✅ Fix: Log error to avoid ESLint warning
      return rejectWithValue("Failed to fetch preferred courses");
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourseToStore: (state, action: PayloadAction<Course>) => {
      state.Courses.push(action.payload);
    },
    removeCourseFromStore: (state, action: PayloadAction<string>) => {
      state.Courses = state.Courses.filter(
        (course) => course._id !== action.payload
      );
    },
    editCourseFromStore: (state, action: PayloadAction<Course>) => {
      const index = state.Courses.findIndex(
        (c) => c._id === action.payload._id
      );
      if (index !== -1) state.Courses[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCourses.fulfilled, (state, action) => {
        state.Courses = action.payload;
      })
      .addCase(fetchAsyncPreferenceCourse.fulfilled, (state, action) => {
        state.PreferenceCourse = action.payload;
      });
  },
});

export const { addCourseToStore, removeCourseFromStore, editCourseFromStore } =
  courseSlice.actions;
export default courseSlice.reducer;
