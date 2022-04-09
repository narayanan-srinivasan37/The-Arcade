import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { formatCurrency } from "../../../HelperFunctions/FormatCurrency";
import { addACartItem } from "../../../ReduxStore/Reducers/CartReducer";
import { useDispatch, useSelector } from "react-redux";
import "./Product.css";
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const addItemToCart = async () => {
    try {
      if (auth.isAuthenticated) {
       
        const data = {
          cart_id: auth.user.cart_id,
          product_id: product.id,
          quantity: 1,
        };
       
        await dispatch(addACartItem(data));
      } else navigate("/login");
    } catch (err) {
      throw err;
    }
  };

  return (
    <Card className="product-root">
      <Link to={`/store/${product.id}`} style={{ color: "inherit" }}>
        <CardMedia
          component="img"
          height={350}
          style={{
            objectFit: "contain",
            margin: "0.2rem auto 0.2rem auto",
            width: "70%",
            display: "flex",
          }}
          src={product.image_url}
          alt="green iguana"
        />
      </Link>
      <CardContent>
        <div className="card-content">
          <Typography
            style={{
              overflow: " hidden",
              whiteSpace: "wrap",
              padding: "10 16 0 16",
              height: 60,
              textOverflow: "ellipsis",
            }}
            variant="h6"
          >
            {product.name}
          </Typography>
          <Typography variant="h6">{formatCurrency(product.price)}</Typography>
        </div>
      </CardContent>
      <div className="card-actions">
        <Button
          className="cart-icon"
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={addItemToCart}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default Product;
