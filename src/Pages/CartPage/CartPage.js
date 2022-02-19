import React, { Component, useEffect } from "react";
import Cart from "../../Component/Cart/Cart";
import { getAllCartItems } from "../../ReduxStore/Reducers/CartReducer";
import { useDispatch, useSelector } from "react-redux";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
import Loader from "../../Component/Loader/Loader";
const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, isLoading, isError } = useSelector((state) => {
    return state.cart;
  });
  useEffect(() => {
    dispatch(getAllCartItems());
  }, []);
  if (isLoading) {
    return (
      <ComponentLayout>
        <Loader />
      </ComponentLayout>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <ComponentLayout>
      <Cart cart={cart} />
    </ComponentLayout>
  );
};

export default CartPage;
