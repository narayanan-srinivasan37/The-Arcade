import React, {useEffect } from "react";
import Order from "../../Component/Order/Order";
import { useDispatch, useSelector } from "react-redux";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
import Loader from "../../Component/Loader/Loader";
const OrderPage = () => {
  const dispatch = useDispatch();
  const { cart, isLoading, isError } = useSelector((state) => {
    return state.cart;
  });
  const {user} = useSelector(state=>state.auth)
  useEffect(() => {
    
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
      <Order order={orders} />
    </ComponentLayout>
  );
};

export default OrderPage;
