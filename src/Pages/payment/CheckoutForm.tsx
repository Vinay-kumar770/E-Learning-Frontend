import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import AuthService from "../../ApiServices/auth.service";
import styles from "./stripe.module.css";

interface CheckoutFormProps {
  courseName: string;
  price: number;
  teacherName: string;
  courseId: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  courseName,
  price,
  teacherName,
  courseId,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or elements not loaded");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.log("Card element not found");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error && paymentMethod) {
      console.log("Stripe | token generated!", paymentMethod);
      const { id } = paymentMethod;

      AuthService.StripePayment({
        amount: price * 100, // Stripe uses smallest currency unit (e.g., cents)
        id: id,
      })
        .then((res) => {
          console.log(res);
          alert("Payment successful");
        })
        .catch((err) => {
          console.log(err);
          alert("Payment Failed");
        });
    } else {
      console.log(error?.message);
    }
  };

  return (
    <div className={styles.Checkout}>
      <h2>Checkout</h2>
      <div className={styles.Course}>
        <div className={styles.Course_detail}>
          <p>Content Name: </p>
          <span className={styles.courseName}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/course/${courseName}/${courseId}`}
            >
              {courseName}
            </Link>
          </span>
        </div>

        <div className={styles.Course_detail}>
          <p>AMOUNT: </p>
          <span> INR {price}</span>
        </div>

        <div className={styles.Course_detail}>
          <p>Teacher Name: </p>
          <span className={styles.teacherName}> {teacherName} </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={styles.CheckoutForm}
        style={{ maxWidth: 400 }}
      >
        <CardElement className={styles.CardElement} />
        <div className={styles.pay}>
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;

// Let me know if you want me to tweak anything else! 🚀
