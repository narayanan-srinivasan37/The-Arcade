import React, { useEffect } from "react";
import RegistrationForm from "../../Component/RegistrationForm/RegistrationForm";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((state) => state);
  useEffect(() => {
    if (auth.isAuthenticated) return navigate("/");
  }, []);

  return (
    <ComponentLayout>
      <RegistrationForm />
    </ComponentLayout>
  );
};
export default RegisterPage;
