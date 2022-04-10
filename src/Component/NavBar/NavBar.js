import React, { useState, useEffect } from "react";
import {IconButton } from "@material-ui/core";
import "./NavBar.css";
import { NavOptions } from "../../Constants/NavBar_Link";
import { useSelector, useDispatch } from "react-redux";
import Badge from "@mui/material/Badge";
import { MdVideogameAsset } from "react-icons/md";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { checkisLoggedIn } from "../../ReduxStore/Reducers/AuthReducer";
import PopOver from "./PopOver";


const showBackButton = (location, navigate) => {
  if (location.pathname !== "/") {
    return (
      <IconButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
    );
  }
};

const Cart = (props) => {
  return (
    <ShoppingCartIcon aria-label="cart" style={{ paddingLeft: "0.5rem" }} />
  );
};

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    async function checkLogin() {
      await dispatch(checkisLoggedIn());
    }
    checkLogin();
  }, [dispatch, location.pathname]);
  const { isAuthenticated , user} = useSelector((state) => {
    return state.auth;
  });
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="navheader">
      <div className="nav-left">
        {showBackButton(location, navigate)}
        <MdVideogameAsset size={30} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              padding: 0,
              margin: " 0 0.5rem",
              fontSize: "1rem",
              position: "relative",
            }}
          >
            The{""}
          </p>
          <p>Arcade</p>
        </div>
      </div>
      <div className="nav-center"></div>
      <div className="nav-right">
        {NavOptions.map((options, index) => {
          return (
            <div className="nav-options" key={index}>
              <NavLink
                to={options.path}
                className="list-options"
              >
                {options.name}
              </NavLink>
            </div>
          );
        })}
        
        {isAuthenticated ? (
          <PopOver navigate={navigate} user={user} dispatch={dispatch} />
        ) : (
          <Link style={{ color: "black" }} color="inherit" to="/login">
            <LoginIcon />
          </Link>
        )}
        {location.pathname.includes("store") && (
          <Link style={{ color: "black" }} to="/store/cart">
            <Badge badgeContent={cart.length} color="primary">
              <Cart />
            </Badge>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
