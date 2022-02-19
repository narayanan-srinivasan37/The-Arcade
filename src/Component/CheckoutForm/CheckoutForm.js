import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./CheckoutForm.css";
import { TextField, Button } from "@material-ui/core";
const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    if (!values.street_address) {
      errors.street_address = "Required";
    }
    if (!values.city) {
      errors.city = "Required";
    }
    if (!values.state) {
      errors.state = "Required";
    }
    if (!values.zip_code) {
      errors.zip_code = "Required";
    } else if (/^\d{3}\s?\d{3}$/.test(values.zip_code)) {
      errors.zip_code = "Wrong pincode";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: validate,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        navigate("/checkout/payment");
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
  });

  return (
    <div className="checkout-form-div">
      <form className="checkout-form" onSubmit={formik.handleSubmit}>
        <TextField
          style={{ paddingBottom: "1rem" }}
          id="firstName"
          label="First Name"
          variant="outlined"
          placeholder="first name"
          required
          type="text"
          autoComplete="none"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <TextField
          style={{ paddingBottom: "1rem" }}
          id="lastName"
          label="Last Name"
          variant="outlined"
          placeholder="last name"
          required
          type="text"
          autoComplete="none"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <TextField
          style={{ paddingBottom: "1rem" }}
          id="street_address"
          label="Street Address"
          variant="outlined"
          placeholder="street address"
          required
          type="text"
          autoComplete="none"
          onChange={formik.handleChange}
          value={formik.values.street_address}
        />
        <TextField
          style={{ paddingBottom: "1rem" }}
          id="city"
          label="City"
          variant="outlined"
          placeholder="city"
          required
          type="text"
          autoComplete="none"
          onChange={formik.handleChange}
          value={formik.values.city}
        />
        <TextField
          style={{ paddingBottom: "1rem" }}
          id="state"
          label="State"
          variant="outlined"
          placeholder="state"
          required
          type="text"
          autoComplete="none"
          onChange={formik.handleChange}
          value={formik.values.state}
        />
        <TextField
          style={{ paddingBottom: "1rem" }}
          id="zip_code"
          label="Zip Code"
          variant="outlined"
          placeholder="zip code"
          required
          type="text"
          autoComplete="none"
          onChange={formik.handleChange}
          value={formik.values.zip_code}
        />
        <div style={{ paddingTop: "1rem", textDecoration: "none" }}>
          <Button type="submit" variant="outlined">
            Checkout
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
