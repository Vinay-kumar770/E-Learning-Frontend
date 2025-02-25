import AuthServices from "../../ApiServices/auth.service";
import {
  FETCH_ALL_DATA,
  FETCH_PREFERENCE_DATA,
  ADD_COURSE_TO_STORE,
  REMOVE_COURSE_FROM_STORE,
  EDIT_COURSE_FROM_STORE,
  CourseActionTypes,
  Course,
} from "./actionTypes";
import { Dispatch } from "redux";

// ✅ Fetch all courses action
export const fetchData = (data: Course[]): CourseActionTypes => {
  return {
    type: FETCH_ALL_DATA,
    data,
  };
};

// ✅ Fetch preference courses action
export const fetchPreferenceData = (data: Course[]): CourseActionTypes => {
  return {
    type: FETCH_PREFERENCE_DATA,
    data,
  };
};

// ✅ Add course action
export const addCourseToStore = (data: Course): CourseActionTypes => {
  return {
    type: ADD_COURSE_TO_STORE,
    data,
  };
};

// ✅ Remove course action
export const removeCourseFromStore = (data: string): CourseActionTypes => {
  return {
    type: REMOVE_COURSE_FROM_STORE,
    data,
  };
};

// ✅ Edit course action
export const editCourseFromStore = (data: Course): CourseActionTypes => {
  return {
    type: EDIT_COURSE_FROM_STORE,
    data,
  };
};

// ✅ Async Fetch Courses using Redux Thunk
export const fetchAsyncCourses = () => {
  return async (dispatch: Dispatch<CourseActionTypes>) => {
    // Adding correct type to Dispatch
    try {
      console.log("Fetching Courses...");
      const response = await AuthServices.AllCourses();
      if (response.data && response.data.course) {
        dispatch(fetchData(response.data.course)); // Assuming response.data.course is of type Course[]
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
};

// ✅ Async Fetch Preference Courses using Redux Thunk
export const fetchAsyncPreferenceCourse = (CourseLink: string, data: any) => {
  return async (dispatch: Dispatch<CourseActionTypes>) => {
    // Adding correct type to Dispatch
    try {
      console.log("Fetching Preference Courses...");
      const response = await AuthServices.PreferenceCourse(CourseLink, data);
      if (response.data && response.data.course) {
        dispatch(fetchPreferenceData(response.data.course)); // Assuming response.data.course is of type Course[]
      }
    } catch (error) {
      console.error("Error fetching preference courses:", error);
    }
  };
};
