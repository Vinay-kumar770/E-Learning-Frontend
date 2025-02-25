import React from "react";
import { NavLink } from "react-router-dom";
import "./CSS/CategoriesCard.css";

// List of categories
const categories = [
  { path: "/home/all", label: "All Courses" },
  { path: "/home/Web Development", label: "Web Development" },
  { path: "/home/Web Designing", label: "Web Designing" },
  { path: "/home/React", label: "React" },
  { path: "/home/Photography", label: "Photography" },
  { path: "/home/IOT", label: "IOT" },
  { path: "/home/ML", label: "Machine Learning" },
  { path: "/home/NodeJs", label: "NodeJs" },
  { path: "/home/Hackathon", label: "Hackathons", customClass: "hackathon" },
  { path: "/home/Jobs", label: "Jobs", customClass: "jobs" },
  {
    path: "/home/Interview",
    label: "Interview Preparation",
    customClass: "interview-prep",
  },
  { path: "/home/Career", label: "Career Guidance", customClass: "career" },
  {
    path: "/home/preferences",
    label: "Recommended!",
    customClass: "recommended",
  },
];

const Categories: React.FC = () => {
  // Helper function to handle active class logic
  const getNavLinkClass = (isActive: boolean, customClass: string = "") => {
    return isActive ? `active-category ${customClass}` : customClass;
  };

  return (
    <div className="CategoryDevider">
      <div className="Categories-main">
        <h3 className="Categories-heading">Categories</h3>

        <div className="ListOfCourses">
          {categories.map((category) => (
            <NavLink
              key={category.path}
              to={category.path}
              className={({ isActive }) =>
                getNavLinkClass(isActive, category.customClass || "")
              }
            >
              {category.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="Course-Devider"></div>

      <div className="CategoriesSlider">
        {categories.map((category) => (
          <NavLink
            key={category.path}
            to={category.path}
            className={({ isActive }) =>
              getNavLinkClass(isActive, category.customClass || "")
            }
          >
            {category.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Categories;
