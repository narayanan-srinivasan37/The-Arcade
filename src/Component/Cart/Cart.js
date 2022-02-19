import React, { useState } from "react";
import CartItem from "./CartItem/CartItem";
import "./Cart.css";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useNavigate, NavLink } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { BsCartDash } from "react-icons/bs";
import { formatCurrency } from "./../../HelperFunctions/FormatCurrency";
const getTotalList = (total, GST, shipping_charges) => [
  {
    name: "Total",
    value: total,
  },
  {
    name: "GST",
    value: GST,
  },
  {
    name: "Shipping Charges",
    value: shipping_charges,
  },
];

const Cart = ({ cart }) => {
  const navigate = useNavigate();

  if (cart?.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Shopping Cart is Empty</h1>
        <div className="empty-cart-icon">
          <BsCartDash size={150} />
        </div>
        <NavLink
          style={{ textDecoration: "none", listStyle: "none" }}
          to="/store"
        >
          <Button variant="outlined" startIcon={<SmartToyIcon />}>
            Continue Shopping
          </Button>
        </NavLink>
      </div>
    );
  }

  const getTotal = cart?.reduce((total, amount) => {
    return total + Number(amount.subtotal);
  }, 0);

  const subtotal_list = getTotalList(getTotal, 0, 0);
  const total = subtotal_list.reduce((total, amount) => {
    return total + Number(amount.value);
  }, 0);
  return (
    <div className="cart-root">
      <div className="cart">
        {cart.map((item, index) => {
          return <CartItem key={index} item={item} />;
        })}
      </div>
      <div style={{ minWidth: "30%" }}>
        <div className="billing ">
          <Typography style={{ padding: "0.3rem 0 0.3rem 0" }} variant="h5">
            Billing Details:
          </Typography>
          <div className="side-box">
            <Typography className="price-list" variant="h6">
              Price Details({})
            </Typography>

            <ul className="sub-total">
              {subtotal_list.map((listValue, index) => {
                return (
                  <li key={index}>
                    {listValue.name}
                    <span>{formatCurrency(listValue.value)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="total">
              Total
              <span style={{ float: "right" }}>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
        <div className="place-order">
          <div style={{ padding: " 0.5rem 1rem" }}>
            <button
              onClick={() => {
                navigate("/checkout");
              }}
              type="button"
              style={{ float: "right" }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
