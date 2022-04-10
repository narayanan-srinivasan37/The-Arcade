import React from "react";
import { Typography, InputLabel } from "@mui/material";
import { formatCurrency } from "../../../HelperFunctions/FormatCurrency";
import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    greyColor: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});
const OrderItem = ({ item }) => {
  return (
    <div className="cart-box">
      <div className="cart-item-root">
        <div className="cart-item-img">
          <img
            className="cart-img"
            src={item.image_url}
            aria-label={item.name}
            alt={item.name}
          />
        </div>
        <div className="cart-item-row">
          <div className="cart-item-title-qty">
            <Typography>{item.name}</Typography>
            <div>
            <InputLabel aria-label="quantity" id="cart-item-qty">
                  Qty: {item.quantity}
                </InputLabel>
            </div>
          </div>
          <Typography aria-label="price">
            {formatCurrency(item.price)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
