import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardForm from "./CardForm";
const PaymentForm = () => {
  const PUBLIC_KEY =
    "pk_test_51KLJYlSBZyTZwDC7hu6Fx3CnQM0f22Pz6LXyrinf6iFqmD5lNZq3lAa0gxu0s8asMThSsinBkSpiWV6JpXFpF73F00OG5vPOdl";
  const stripeTestPromise = loadStripe(PUBLIC_KEY);

  return (
    <Elements stripe={stripeTestPromise}>
      <CardForm />
    </Elements>
  );
};

export default PaymentForm;
