import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./CheckoutForm.css";
import { TextField, Button } from "@material-ui/core";
const CheckoutForm = ({ next }) => {
  const [loading, setLoading] = useState(false);
  const [errors, showErrors] = useState(false)
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    street_address: "",
    phoneNumber: "",
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
    if (!values.phoneNumber) {
      errors.phoneNumber = "Required";
    }
   
    if (!/[0-9]{3}[0-9]{3}[0-9]{4}/.test(values.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }
    if (!values.zip_code) {
      errors.zip_code = "Required";
    }
  
    if (!/^[1-9]{1}[0-9]{2}[0-9]{3}$/.test(values.zip_code)) {
      errors.zip_code = "Wrong pincode";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: validate,
    onSubmit: async (values, errors) => {
      
      try {
       
        next(values);
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
        {formik.errors.firstName ? (
          <div className="address-form-err">{formik.errors.firstName}</div>
        ) : null}
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
        {formik.errors.lastName ? (
          <div className="address-form-err">{formik.errors.lastName}</div>
        ) : null}
        <TextField
          style={{ paddingBottom: "1rem" }}
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          placeholder="Phone Number"
          required
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          autoComplete="none"
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
        />
        {formik.errors.phoneNumber ? (
          <div className="address-form-err">{formik.errors.phoneNumber}</div>
        ) : null}
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
        {formik.errors.street_address ? (
          <div className="address-form-err">{formik.errors.street_address}</div>
        ) : null}
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
        {formik.errors.city ? (
          <div className="address-form-err">{formik.errors.city}</div>
        ) : null}
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
        {formik.errors.state ? (
          <div className="address-form-err">{formik.errors.state}</div>
        ) : null}
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
        {formik.errors.zip_code ? (
          <div className="address-form-err">{formik.errors.zip_code}</div>
        ) : null}

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
