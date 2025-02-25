import React, { useState } from "react";
import "./CSS/Preference.css";
import axios from "../../ApiServices/axiosUrl";
import CourseTitle from "./CourseTitle";
import { useHistory } from "react-router-dom";
import Alert from "../Auth/Forms/alert";
import Layout from "../../components/Layout/Layout";

// Define types for the component state
interface PreferenceState {
  interest: string[];
  userId: string | null;
  Courses: {
    "Web Development": { touched: boolean },
    "Web Designing": { touched: boolean },
    React: { touched: boolean },
    ML: { touched: boolean },
    Photography: { touched: boolean },
    NodeJs: { touched: boolean },
  };
  redirect: string | null;
  alert: {
    valid: boolean,
    msg: string,
    alertType: string,
  };
  alertPressed: boolean;
  token: string | null;
}

const Preference: React.FC = () => {
  const [state, setState] =
    useState <
    PreferenceState >
    {
      interest: [],
      userId: localStorage.getItem("userId"),
      Courses: {
        "Web Development": { touched: false },
        "Web Designing": { touched: false },
        React: { touched: false },
        ML: { touched: false },
        Photography: { touched: false },
        NodeJs: { touched: false },
      },
      redirect: null,
      alert: { valid: false, msg: "", alertType: "" },
      alertPressed: false,
      token: localStorage.getItem("user"),
    };

  const history = useHistory();

  // Function to handle alert display
  const AlertError = (alertmsg: string, alertType: string) => {
    setState((prevState) => ({
      ...prevState,
      alert: {
        msg: alertmsg,
        valid: true,
        alertType,
      },
    }));
  };

  // Function to handle category selection
  const categoryHandler = (CourseName: string) => {
    const updatedCourses = { ...state.Courses };
    if (updatedCourses[CourseName].touched) {
      updatedCourses[CourseName].touched = false;
      setState((prevState) => ({
        ...prevState,
        Courses: updatedCourses,
        interest: prevState.interest.filter((item) => item !== CourseName),
      }));
    } else {
      updatedCourses[CourseName].touched = true;
      setState((prevState) => ({
        ...prevState,
        Courses: updatedCourses,
        interest: [...prevState.interest, CourseName],
      }));
    }
  };

  // Submit handler to send preferences to the server
  const SubmitHandler = () => {
    const formData = {
      interest: state.interest,
      userId: state.userId,
    };

    setState((prevState) => ({ ...prevState, alertPressed: true }));

    setTimeout(
      () => setState((prevState) => ({ ...prevState, alertPressed: false })),
      3000
    );

    axios
      .post("/home/interests/", formData, {
        headers: {
          Authorization: `Bearer ${state.token} ${localStorage.getItem(
            "ref_token"
          )}`,
        },
      })
      .then((response) => {
        AlertError("Preferences Added", "success");
        setState((prevState) => ({
          ...prevState,
          redirect: "/home/preferences",
        }));
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.statusText === "Internal Server Error") {
          setState((prevState) => ({ ...prevState, redirect: "/login" }));
        }
      });
  };

  // Redirect if required
  if (state.redirect) {
    history.push(state.redirect);
  }

  let alertContent = null;
  if (state.alert.valid) {
    alertContent = (
      <Alert
        value={state.alertPressed}
        alertMsg={state.alert.msg}
        alertType={state.alert.alertType}
      />
    );
  }

  const getButtonClass = (courseName: string) =>
    state.Courses[courseName].touched ? "touched" : "";

  return (
    <Layout>
      <div className="container">
        {alertContent}
        <div className="title">
          <CourseTitle welcomeMessage="Choose Your interests," />
        </div>
        <div className="Preference-buttons">
          <button
            className={getButtonClass("Web Development")}
            onClick={() => categoryHandler("Web Development")}
          >
            Development
          </button>
          <button
            className={getButtonClass("Web Designing")}
            onClick={() => categoryHandler("Web Designing")}
          >
            Designing
          </button>
          <button
            className={getButtonClass("React")}
            onClick={() => categoryHandler("React")}
          >
            React
          </button>
          <button
            className={getButtonClass("ML")}
            onClick={() => categoryHandler("ML")}
          >
            ML
          </button>
          <button
            className={getButtonClass("Photography")}
            onClick={() => categoryHandler("Photography")}
          >
            Photography
          </button>
          <button
            className={getButtonClass("NodeJs")}
            onClick={() => categoryHandler("NodeJs")}
          >
            Node JS
          </button>
        </div>

        <div className="SubmitBtn">
          <button onClick={SubmitHandler}>Submit</button>
        </div>
      </div>
    </Layout>
  );
};

export default Preference;
