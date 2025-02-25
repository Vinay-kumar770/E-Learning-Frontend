import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  fetchAsyncCourses,
  fetchAsyncPreferenceCourse,
} from "../../store/actions/actions";
import Categories from "./Categories";
import HomeBanner from "./HomeBanner";
import CourseCards from "./CourseCards";
import CourseTitle from "./CourseTitle";
import { ClipLoader } from "react-spinners";
import Layout from "../../components/Layout/Layout";
import Recommendation from "./Recommendation";
import Url from "../../ApiServices/BackendUrl";
import EventCards from "./EventCards";
import "./CSS/Homepage.css";

interface Course {
  _id: string;
  title: string;
  name: string;
  imageurl: string;
  category: string;
  price: number;
  rating: { ratingFinal: number; timesUpdated: number };
}

interface HomepageProps {
  Courses: Course[];
  PreferenceCourses: Course[];
  fetchCourses: () => void;
  fetchPreferenceCourses: (courseLink: string, form: FormData) => void;
}

const Homepage: React.FC<HomepageProps> = ({
  Courses,
  PreferenceCourses,
  fetchCourses,
  fetchPreferenceCourses,
}) => {
  const { CourseName } = useParams<{ CourseName: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    const form = new FormData();
    form.append("userId", localStorage.getItem("userId") || "");

    if (CourseName === "preferences") {
      fetchPreferenceCourses(CourseName, form);
    }

    if (Courses.length === 0) {
      fetchCourses();
    }
    setLoading(false);
  }, [CourseName, Courses, fetchCourses, fetchPreferenceCourses]);

  if (redirect) {
    navigate(redirect);
    return null;
  }

  const events = ["Hackathon", "Job", "Interview", "Career"];

  const courseData = loading ? (
    <ClipLoader size={50} color={"#08BD80"} loading={loading} />
  ) : (
    (CourseName === "preferences" ? PreferenceCourses : Courses)
      .filter(
        (course) => CourseName === "all" || course.category === CourseName
      )
      .map((item) => (
        <NavLink
          className="productLink"
          key={item._id}
          to={`/course/${CourseName}/${item._id}`}
        >
          {events.includes(item.category) ? (
            <EventCards
              title={item.title}
              teacher={item.name}
              img={Url + item.imageurl}
              rating={item.rating.ratingFinal || 1}
              price={item.price}
              ratingtimesUpdated={item.rating.timesUpdated}
            />
          ) : (
            <CourseCards
              title={item.title}
              teacher={item.name}
              img={Url + item.imageurl}
              rating={item.rating.ratingFinal || 1}
              price={item.price}
              ratingtimesUpdated={item.rating.timesUpdated}
            />
          )}
        </NavLink>
      ))
  );

  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/home">Home</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink
                to={`/Home/${CourseName}`}
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
              >
                {CourseName}
              </NavLink>
            </li>
          </ol>
        </nav>

        <HomeBanner img={CourseName as string} />

        <div className="mt-3 Course-Content">
          <Categories />
          <div className="Course-Content-col">
            <CourseTitle welcomeMessage={"Welcome"} />
            <div className="Course-Content-wrap">{courseData}</div>
            <Recommendation />
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface RootState {
  filter: {
    Courses: Course[];
    PreferenceCourse: Course[];
  };
}

const mapStateToProps = (state: RootState) => ({
  Courses: state.filter?.Courses || [], // Safe check and default value
  PreferenceCourses: state.filter?.PreferenceCourse || [], // Safe check and default value
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => ({
  fetchCourses: () => dispatch(fetchAsyncCourses()),
  fetchPreferenceCourses: (courseLink: string, form: FormData) =>
    dispatch(fetchAsyncPreferenceCourse(courseLink, form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
