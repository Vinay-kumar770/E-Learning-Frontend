// ✅ Define Action Type Constants
export const FETCH_ALL_DATA = "FETCH_ALL_DATA";
export const FETCH_PREFERENCE_DATA = "FETCH_PREFERENCE_DATA";
export const ADD_COURSE_TO_STORE = "ADD_COURSE_TO_STORE";
export const REMOVE_COURSE_FROM_STORE = "REMOVE_COURSE_FROM_STORE";
export const EDIT_COURSE_FROM_STORE = "EDIT_COURSE_FROM_STORE";

// ✅ Define Course Interface
export interface Course {
  _id: string;
  title: string;
  name: string;
}

// ✅ Define Action Interfaces
export interface FetchDataAction {
  type: typeof FETCH_ALL_DATA;
  data: Course[];
}

export interface FetchPreferenceDataAction {
  type: typeof FETCH_PREFERENCE_DATA;
  data: Course[];
}

export interface AddCourseAction {
  type: typeof ADD_COURSE_TO_STORE;
  data: Course;
}

export interface RemoveCourseAction {
  type: typeof REMOVE_COURSE_FROM_STORE;
  data: string; // Assuming `_id` is a string
}

export interface EditCourseAction {
  type: typeof EDIT_COURSE_FROM_STORE;
  data: Course;
}

// ✅ Export Action Type Union
export type CourseActionTypes =
  | FetchDataAction
  | FetchPreferenceDataAction
  | AddCourseAction
  | RemoveCourseAction
  | EditCourseAction;
