import React from "react";
import { Link } from "react-router-dom";
import "./CSS/HomeBanner.css";

// Define types for the component props
interface HomepageBannerProps {
  img: string | null; // img can be a string (URL) or null
}

const HomepageBanner: React.FC<HomepageBannerProps> = ({ img }) => {
  // Conditional rendering based on img prop
  if (img) {
    return (
      <>
        <div className="BannerSection">
          <div className="BannerImage" />
        </div>
        <p className="Banner-text">
          Best place to <br />
          learn new things
        </p>
      </>
    );
  }

  return (
    <div className="Teacher-banner">
      <p className="Teacher-text">
        Share Your Knowledge
        <br />
        with the whole World!
      </p>

      <Link to="teacher">
        <button className="createCourse">Create New Content</button>
      </Link>
    </div>
  );
};

export default HomepageBanner;
