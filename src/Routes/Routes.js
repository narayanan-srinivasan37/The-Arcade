import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import BlogPage from "../Pages/BlogPage/BlogPage";
import ProductPage from "../Pages/ProductPage/ProductPage";
import { useDispatch } from "react-redux";
import { checkisLoggedIn } from "../ReduxStore/Reducers/AuthReducer";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
import PrivateRoute from "./PrivateRoutes";
import CartPage from "../Pages/CartPage/CartPage";
import BlogViewPage from "../Pages/BlogViewPage/BlogViewPage";
import BlogCreatePage from "../Pages/BlogCreatePage/BlogCreatePage";
import BlogEditPage from "../Pages/BlogEditPage/BlogEditPage";
import ProductsViewPage from "../Pages/ProductsViewPage/ProductsViewPage";
import OrderPage from "../Pages/OrderPage/OrderPage";
const PageRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkLogin() {
      await dispatch(checkisLoggedIn());
    }
    checkLogin();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterPage />} />
        <Route path="/blog" exact element={<BlogPage />} />
        <Route path="/blog/:id" exact element={<BlogViewPage />} />
        <Route path="/store" exact element={<ProductPage />} />
        <Route path="/store/:id" exact element={<ProductsViewPage />} />
        <Route
          path="/blog/create"
          exact
          element={
            <PrivateRoute>
              <BlogCreatePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/:id/edit"
          exact
          element={
            <PrivateRoute>
              <BlogEditPage />
            </PrivateRoute>
          }
        />
        <Route
          path="store/cart"
          exact
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          exact
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route    path="/myorders"
          exact
          element={
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          }/>
      </Routes>
    </Router>
  );
};

export default PageRoutes;
