// ✅ Define Action Types
const FETCH_ALL_DATA = "FETCH_ALL_DATA";
const FETCH_PREFERENCE_DATA = "FETCH_PREFERENCE_DATA";
const ADD_COURSE_TO_STORE = "ADD_COURSE_TO_STORE";
const REMOVE_COURSE_FROM_STORE = "REMOVE_COURSE_FROM_STORE";
const EDIT_COURSE_FROM_STORE = "EDIT_COURSE_FROM_STORE";

// ✅ Define Course Type
export interface Course {
  _id: string;
  title: string;
  name: string;
}

// ✅ Define State Type
interface CourseState {
  Courses: Course[];
  PreferenceCourse: Course[];
}

// ✅ Initial State
const initialState: CourseState = {
  Courses: [],
  PreferenceCourse: [],
};

// ✅ Define Action Type
interface Action {
  type: string;
  data?: any;
}

// ✅ Reducer with TypeScript
const reducer = (state = initialState, action: Action): CourseState => {
  switch (action.type) {
    case FETCH_ALL_DATA:
      return { ...state, Courses: action.data };

    case FETCH_PREFERENCE_DATA:
      return { ...state, PreferenceCourse: action.data };

    case ADD_COURSE_TO_STORE:
      return { ...state, Courses: [...state.Courses, action.data] }; // ✅ Fix state mutation

    case REMOVE_COURSE_FROM_STORE:
      return {
        ...state,
        Courses: state.Courses.filter((course) => course._id !== action.data),
      };

    case EDIT_COURSE_FROM_STORE:
      return {
        ...state,
        Courses: state.Courses.map((course) =>
          course._id === action.data._id ? action.data : course
        ),
      };

    default:
      return state;
  }
};

export default reducer;
