import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { useParams } from "react-router-dom";
import Navbar from "../../components/UI/Navigation/Navbar/Navbar";
import AuthService from "../../ApiServices/auth.service";

// Define the shape of the course object
interface Course {
  _id: string;
  title: string;
  name: string;
  price: number;
}

// Define the component props

const Stripe: React.FC = () => {
  const { CourseLink: courseLink } = useParams<{ CourseLink: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  const stripeTestPromise = loadStripe(import.meta.env.VITE_APP_STRIPE_API_KEY);

  useEffect(() => {
    console.log(courseLink);
    AuthService.StripePayment_course(courseLink as string)
      .then((response) => {
        console.log("Response:", response);
        setCourse(response.data.course);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [courseLink]);

  return (
    <>
      <Navbar />
      <Elements stripe={stripeTestPromise}>
        <CheckoutForm
          courseName={course?.title || ""}
          price={course?.price || 0}
          teacherName={course?.name || ""}
          courseId={course?._id || ""}
        />
      </Elements>
    </>
  );
};

export default Stripe;
