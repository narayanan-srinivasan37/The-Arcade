import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { checkisLoggedIn } from "../../ReduxStore/Reducers/AuthReducer";
import "./CardForm.css";
import { useNavigate } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import { payment, paymentFailure, paymentSuccess } from "../../API_CALLS/Payment";
const CardForm = ({ previousStep, addressData, nextStep }) => {
  const navigate = useNavigate();
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const dispatch = useDispatch()
  const { cart, auth } = useSelector((state) => state);
  const elements = useElements();
  const processPayment = async (e) => {
    e.preventDefault();
    const response = dispatch(checkisLoggedIn());
   
    if (!stripe || !elements) {
      return;
    }
    try {
      const getTotal = cart?.cart?.reduce((total, amount) => {
        
        return total + Number(amount.subtotal);
      }, 0);
     
      const data = await payment(getTotal, auth.user.email, addressData);
  
      const cardElement = elements.getElement(CardElement);
      const confirm = await stripe.confirmCardPayment(data.result.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Narayanan",
          },
        },
      });
      if (confirm.error) {
        // Show error to your customer (for example, insufficient funds)
        const failure = await paymentFailure(data.orderId)
      
      }
      if (confirm.paymentIntent.status === "succeeded") {
       
        const success = await paymentSuccess(data.orderId)
        setSuccess(true);
        navigate("/");
      }
      
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
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <button
                className="pay-button"
                disabled={isPaymentLoading}
                onClick={previousStep}
              >
                Previous
              </button>
              <button
                className="pay-button"
                disabled={isPaymentLoading}
                onClick={processPayment}
              >
                {isPaymentLoading ? "Loading..." : "Pay"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardForm;
