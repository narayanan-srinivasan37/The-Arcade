import React, { useState } from "react";
import { Form, Formik, useFormik } from "formik";
import TextField from "@mui/material/TextField";
import SendIcon from "@material-ui/icons/Send";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../ReduxStore/Reducers/AuthReducer";

const RegistrationForm = () => {
  const { error, setError } = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const validate = (values) => {
  
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password < 8) {
      errors.password = "Password should be atleast 8 characters and above";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password mismatch";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  };
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validate: validate,
    onSubmit: async (credentials) => {
      try {
        setLoading(true);
        await dispatch(registerUser(credentials));
        setLoading(false);
        navigate("/");
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    },
  });
  if (isAuthenticated) navigate("/");
  return (
    <div className="login-form-div">
      <div className="login-form-inside">
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            margin: "0.3rem",
          }}
        >
          Register
        </p>
        <form className="login-form" onSubmit={formik.handleSubmit}>
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
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="e-mail"
            required
            type="email"
            autoComplete="none"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className="address-form-err">{formik.errors.email}</div>
          ) : null}
          <TextField
            style={{ paddingBottom: "1rem" }}
            id="password"
            label="Password"
            variant="outlined"
            placeholder="password"
            type="password"
            required
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <div className="address-form-err">{formik.errors.password}</div>
          ) : null}
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            placeholder="password"
            type="password"
            required
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword ? (
            <div className="address-form-err">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
          <div style={{ paddingTop: "1rem" }}>
            <Button type="submit" variant="outlined" endIcon={<SendIcon />}>
              Register
            </Button>
          </div>
        </form>
        <p stye={{ margin: "0.2rem" }}>
          If you already have an account{" "}
          <Link to="/login" underline="hover">
            Login
          </Link>
        </p>
      
      </div>
    </div>
  );
};

export default RegistrationForm;
