import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatCurrency } from "../../../HelperFunctions/FormatCurrency";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  updateACartItem,
  deleteACartItem,
} from "../../../ReduxStore/Reducers/CartReducer";
import { useDispatch } from "react-redux";
import "./CartItem.css";

const theme = createTheme({
  palette: {
    greyColor: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(item.qty);
  const handleChange = async (e) => {
    const params = {
      cart_id: item.cartitemid,
      product_id: item.id,
      quantity: e.target.value,
    };
    setQty(e.target.value);
    await dispatch(updateACartItem(params));
  };

  const handleRemove = async()=>{
    const params = {
      cart_id: item.cartitemid,
      product_id: item.id,
    };
    await dispatch(deleteACartItem(params))
  }
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
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel aria-label="quantity" id="cart-item-qty">
                  Qty
                </InputLabel>
                <Select
                  labelId="cart-item-qty"
                  id="qty-select"
                  value={qty}
                  label="Qty"
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5].map((value, index) => {
                    return (
                      <MenuItem key={index} value={value}>
                        {value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <Typography aria-label="price">
            {formatCurrency(item.subtotal)}
          </Typography>
        </div>
      </div>
      <div className="cart-item-footer">
        <div className="remove-button">
          <ThemeProvider theme={theme}>
            <Button
              color="greyColor"
              aria-label="remove"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleRemove}
            >
              Remove
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
