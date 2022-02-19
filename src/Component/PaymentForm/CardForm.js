import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
  createPaymentMethod,
} from "@stripe/react-stripe-js";
import "./CardForm.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { payment } from "../../API_CALLS/Payment";
const CardForm = () => {
  const navigate = useNavigate();
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const processPayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    try {
      const data = await payment("124", "narayanansrinivasan37@gamil.com");
      const cardElement = elements.getElement(CardElement);
      const confirm = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Narayanan",
          },
        },
      });
      if (confirm.error) {
        // Show error to your customer (for example, insufficient funds)
        console.log(confirm.error.message);
      }
      if (confirm.paymentIntent.status === "succeeded") {
        setSuccess(true);
        navigate("/");
      }
      console.log(confirm);
    } catch (err) {
      throw err;
    }
  };
  return (
    <div style={{ padding: "3rem 0rem", width: "100%" }}>
      <div className="card-form">
        <form style={{ display: "block", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardElement
              className="card-number"
              options={{
                style: {
                  base: {
                    backgroundColor: "white",
                  },
                },
              }}
            />

            <button
              className="pay-button"
              disabled={isPaymentLoading}
              onClick={processPayment}
            >
              {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardForm;
