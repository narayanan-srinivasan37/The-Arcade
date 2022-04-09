import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@material-ui/core";
import "./NavBar.css";
import { NavOptions } from "../../Constants/NavBar_Link";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { MdVideogameAsset } from "react-icons/md";
import LoginIcon from "@mui/icons-material/Login";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../ReduxStore/Reducers/AuthReducer";
import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
const PopOver = ({ navigate, user }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(false);
  const divRef = React.useRef();
  const handleClick = (event) => {
    setAnchorEl(divRef.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/");
  };
  return (
    <div>
      <Avatar ref={divRef} onClick={handleClick}>
        {user.firstName[0]}
      </Avatar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",

        }}
      >
        <div style={{display:'flex', flexDirection:'column'}}>
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={handleLogout}>My Orders</Button>
        </div>
      </Popover>
     
    </div>
  );
};

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
          <PopOver navigate={navigate} user={user} />
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
