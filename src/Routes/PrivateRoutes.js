import React , {useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import { checkisLoggedIn } from "../ReduxStore/Reducers/AuthReducer";
import { Navigate , useLocation} from "react-router-dom";
const PrivateRoute = ({ children }) => { 
  const dispatch = useDispatch();
  const location = useLocation()
  useEffect(() => {
    async function checkLogin() {
      await dispatch(checkisLoggedIn());
    }
    checkLogin();
  }, [dispatch, location.pathname]);
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
