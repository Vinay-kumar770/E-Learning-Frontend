import React from "react";
import "./CSS/CategoriesCard.css";

// Define the prop types for the EventCards component
interface EventCardsProps {
  title: string;
  teacher: string;
  img: string;
  price?: number;
  rating?: number;
  ratingtimesUpdated?: number;
}

const EventCards: React.FC<EventCardsProps> = ({ img, title, teacher }) => {
  return (
    <div className="Course-Cards">
      <div className="my-card">
        <img src={img} alt={title} loading="lazy" />
        <p className="Course-Title">{title}</p>
        <p className="Course-Teacher">{teacher}</p>
      </div>
    </div>
  );
};

export default EventCards;
