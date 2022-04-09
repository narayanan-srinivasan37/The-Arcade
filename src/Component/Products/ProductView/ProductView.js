import React from "react";
import { Button } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { formatCurrency } from "../../../HelperFunctions/FormatCurrency";
import { addACartItem } from "../../../ReduxStore/Reducers/CartReducer";
import "./ProductView.css";
const ProductView = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const addItemToCart = async () => {
    try {
      if (auth.isAuthenticated) {
      
        const data = {
          cart_id: auth.user.cart_id,
          product_id: products.id,
          quantity: 1,
        };
      
        await dispatch(addACartItem(data));
      } else navigate("/login");
    } catch (err) {
      throw err;
    }
  };
  return (
    <div>
      {
        <div className="product-view">
          <div>
            <img src={products.image_url} alt={products.name || "image"} />
          </div>
          <div className="product-view-right">
            <p className="product-name">{products.name}</p>
            <div>
              <p className="product-description">Description</p>
              <p className="product-description-content">
                {products.description}
              </p>
            </div>
            <hr style={{ height: "0.09rem", backgroundColor: "black" }} />
            <div className="product-price">
              <p>{formatCurrency(products.price)}</p>
              <div>
                <Button
                  className="cart-icon"
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={addItemToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
export default ProductView;
