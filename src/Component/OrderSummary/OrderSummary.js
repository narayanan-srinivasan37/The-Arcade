import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../HelperFunctions/FormatCurrency";
import "./OrderSummary.css";
const OrderSummary = ({ addressData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (!cart?.length) navigate("/cart");
  }, []);
  const getTotalList = (total, shipping_charges) => [
    {
      name: "Total",
      value: total,
    },

    {
      name: "Shipping Charges",
      value: shipping_charges,
    },
  ];
  const getTotal = cart?.reduce((total, amount) => {
    return total + Number(amount.subtotal);
  }, 0);

  const subtotal_list = getTotalList(getTotal, 0, 0);
  const total = subtotal_list.reduce((total, amount) => {
    return total + Number(amount.value);
  }, 0);
  
  return (
    <div style={{ margin: "1rem" }}>
      <div className="order-address">
        <h4>Delivery Address</h4>
        <p>
          {addressData.firstName}
          <span>&nbsp;{addressData.lastName}</span>
        </p>
        <p>{addressData.street_address}</p>
        <p>
          {addressData.city}
          <span>&nbsp;{addressData.state}</span>
        </p>
        <p>{addressData.zip_code}</p>
        <p>Phone Number : {addressData.phoneNumber}</p>
      </div>
      <table>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        {cart.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{formatCurrency(item.subtotal)}</td>
            </tr>
          );
        })}
        {subtotal_list.map((item, index) => {
          return (
            <tr key={index}>
              <td></td>
              <td>{item.name}</td>
              <td>{formatCurrency(item.value)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default OrderSummary;
