import React, { useState } from "react";
import StarRatings from "react-star-ratings"; // Import react-star-ratings
import AuthServices from "../../ApiServices/auth.service";

// Define the prop types
interface RatingProps {
  rating: number;
  CourseId?: string;
  edit: boolean;
}

const Rating: React.FC<RatingProps> = ({ rating, CourseId, edit }) => {
  const [loading, setLoading] = useState(false);

  const ratingChanged = (newRating: number) => {
    const form = {
      courseId: CourseId,
      rating: newRating,
    };

    setLoading(true); // Set loading state before making the request

    AuthServices.Rating(form)
      .then((response) => {
        console.log("Rating", response);
        setLoading(false); // Reset loading state after the response
        alert("Your rating has successfully added");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Reset loading state in case of error
      });
  };

  return (
    <>
      {rating ? (
        <StarRatings
          rating={rating}
          starRatedColor="#FF9529"
          changeRating={ratingChanged}
          numberOfStars={5}
          starDimension="24px"
          starSpacing="2px"
          // isSelectable={edit}
        />
      ) : (
        <p>Rating</p>
      )}
    </>
  );
};

export default Rating;
