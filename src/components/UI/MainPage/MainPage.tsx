import React from "react";
import "./MainPage.css";
import circle from "../../../assets/Images/circle12.svg";

interface MainPageProps {
  shelp?: boolean;
  heading1: string;
  heading2: string;
}

const MainPage: React.FC<MainPageProps> = ({ shelp, heading1, heading2 }) => {
  return (
    <>
      <h1 className="Content-text">
        <span className="heading-1">{heading1}</span>
        <br />
        <span className="heading-2">{heading2}</span>
        {shelp && (
          <>
            <br />
            <span className="heading-3">Girl</span>
            <span className="heading-4">Academy</span>
          </>
        )}
        <div className="MainPageback">
          <img className="circle1" src={circle} alt="circle2" />
        </div>
      </h1>
    </>
  );
};

export default MainPage;
