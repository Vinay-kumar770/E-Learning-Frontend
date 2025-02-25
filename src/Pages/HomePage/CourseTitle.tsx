import React from "react";
import "./CSS/CategoriesCard.css";
import AuthServices from "../../ApiServices/auth.service";

// Define the props type
interface CourseTitleProps {
  welcomeMessage: string;
}

const CourseTitle: React.FC<CourseTitleProps> = ({ welcomeMessage }) => {
  const userName = AuthServices.getUserName();
  let WelcomeMsg = "Register to Start Learning!";

  if (userName !== null) {
    WelcomeMsg = `${welcomeMessage} ${userName}!`;
  }

  return <h3 className="CategoriesTitle">{WelcomeMsg}</h3>;
};

export default CourseTitle;
