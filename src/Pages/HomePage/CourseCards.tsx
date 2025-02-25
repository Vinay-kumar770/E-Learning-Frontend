import React from "react";
import "./CSS/CategoriesCard.css";
import Rating from "../CoursePage/Rating";

// Define the types for props
interface CourseCardsProps {
  img: string;
  title: string;
  teacher: string;
  rating: number;
  ratingtimesUpdated: number;
  price: number;
}

const CourseCards: React.FC<CourseCardsProps> = ({
  img,
  title,
  teacher,
  rating,
  ratingtimesUpdated,
  price,
}) => {
  return (
    <div className="Course-Cards">
      <div className="my-card">
        <img src={img} alt="Course Image" loading="lazy" />
        <p className="Course-Title">{title}</p>
        <p className="Course-Teacher">{teacher}</p>

        <p className="Course-info">
          <span className="Course-rating">{rating}</span>
          <span className="Course-star">
            <Rating rating={rating} edit={false} />
          </span>
          <span className="CourseTimesUpdated">
            ({ratingtimesUpdated} ratings)
          </span>
          <span className="Course-Price">₹ {price}</span>
        </p>
      </div>
    </div>
  );
};

export default CourseCards;
