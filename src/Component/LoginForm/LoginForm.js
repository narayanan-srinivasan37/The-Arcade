import React, { useState } from "react";
import { Form, Formik, useFormik } from "formik";
import TextField from "@mui/material/TextField";
import SendIcon from "@material-ui/icons/Send";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../ReduxStore/Reducers/AuthReducer";
import { useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Required";
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
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validate: validate,
    onSubmit: async (credentials) => {
      try {
        setLoading(true);
        const response = await dispatch(loginUser(credentials));
      } catch (err) {
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
          }}
        >
          Login
        </p>
        {error ? <p style={{color:'red'}}>Incorrect username or password</p> : null}
        <form className="login-form" onSubmit={formik.handleSubmit}>
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

          <TextField
            id="password"
            label="Password"
            variant="outlined"
            placeholder="password"
            type="password"
            required
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div style={{ paddingTop: "1rem" }}>
            <Button type="submit" variant="outlined" endIcon={<SendIcon />}>
              Login
            </Button>
          </div>
        </form>
        <p>
          If you don't have an account{" "}
          <Link to="/register" underline="hover">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
