import React, {useEffect }from "react";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
import LoginForm from "../../Component/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((state) => state);
  useEffect(()=>{
    if (auth.isAuthenticated) return navigate("/");
  },[])
 
  return (
    <ComponentLayout>
      <LoginForm />
    </ComponentLayout>
  );
};

export default LoginPage;
