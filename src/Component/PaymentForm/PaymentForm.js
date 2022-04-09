import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardForm from "./CardForm";
import OrderSummary from "../OrderSummary/OrderSummary";
const PaymentForm = ({ previousStep, addressData, nextStep }) => {
  const PUBLIC_KEY =
    "pk_test_51KLJYlSBZyTZwDC7hu6Fx3CnQM0f22Pz6LXyrinf6iFqmD5lNZq3lAa0gxu0s8asMThSsinBkSpiWV6JpXFpF73F00OG5vPOdl";
  const stripeTestPromise = loadStripe(PUBLIC_KEY);

  return (
    <div>
      {" "}
      <OrderSummary addressData={addressData} />
      <Elements stripe={stripeTestPromise}>
        <CardForm previousStep={previousStep} addressData={addressData} />
      </Elements>
    </div>
  );
};

export default PaymentForm;
