import React, { useState } from "react";
import CheckoutForm from "../../Component/CheckoutForm/CheckoutForm";
import PaymentForm from "../../Component/PaymentForm/PaymentForm";

import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState();

  const nextStep = () =>
    setActiveStep((prevStep) => setActiveStep(prevStep + 1));
  const previousStep = () =>
    setActiveStep((prevStep) => setActiveStep(prevStep - 1));

  const next = (data) => {
    setAddressData(data);
    nextStep();
  };
  return (
    <ComponentLayout>
      <p style={{fontSize:'30px', textAlign:'center', paddingBottom:"0.1rem"}}>Check Out</p>
      {activeStep === 0 ? (
        <CheckoutForm next={next} />
      ) : (
        <PaymentForm
          nextStep={nextStep}
          previousStep={previousStep}
          addressData={addressData}
        />
      )}
    </ComponentLayout>
  );
};

export default CheckoutPage;
