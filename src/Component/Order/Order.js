import React, { useState } from "react";
import OrderItem from "./OrderItem/OrderItem";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useNavigate, NavLink } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { BsCartDash } from "react-icons/bs";
import './Order.css'
import { formatCurrency } from "./../../HelperFunctions/FormatCurrency";
const getTotalList = (total,  shipping_charges) => [
  {
    name: "Total",
    value: total,
  },

  {
    name: "Shipping Charges",
    value: shipping_charges,
  },
];

const Order= ({ order}) => {

  if (order?.length === 0) {
    return (
      <div className="empty-cart">
        <h1>No Orders are made</h1>
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
  
  return (
    <div className="order-root">
      <p className="my-order" > My Orders</p>
      {
        order.map((data, index)=>{
          const date = new Date(data.created).toDateString()
          console.log(date, data.created)
          return (
            <div className="order">
              <div className="order-id">
              <span>Order ID : {data.id}</span>
              <span style={{display:'flex',justifyContent:'flex-end'}}>{date}</span>
              </div>
              {
            data.orderitems.map((item, index)=>{
            return (
            <div>
            <OrderItem key={index} item={item} /></div>)
          })}
          <p className="order-total">Total : {formatCurrency(data.total)}</p>
          </div>
          )
        })
      }
    </div>
  );
};

export default Order;
