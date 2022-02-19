import React, { useState } from "react";
import { Form, Formik, useFormik } from "formik";
import TextField from "@mui/material/TextField";
import SendIcon from "@material-ui/icons/Send";
import Button from "@mui/material/Button";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate ,Link} from "react-router-dom";
import GoogleLogin from "react-google-login";
import { registerUser } from "../../ReduxStore/Reducers/AuthReducer";

const RegistrationForm = () => {
  const { error, setError } = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleGoogleLogin = async () => {};

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
  };
  const formik = useFormik({
    initialValues: initialValues,
    validate: validate,
    onSubmit: async (credentials) => {
      try {
        setLoading(true);
        const response = await dispatch(registerUser(credentials));
        setLoading(false);
        if (isAuthenticated) navigate("/");
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    },
  });

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
        <p style={{ margin: "0.2rem" }}>Or Sign up using</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0.2rem",
            paddingBottom: "1rem",
          }}
        >
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
