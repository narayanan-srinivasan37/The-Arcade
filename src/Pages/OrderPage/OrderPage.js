import React, {useEffect } from "react";
import Order from "../../Component/Order/Order";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../ReduxStore/Reducers/OrderReducer";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
import Loader from "../../Component/Loader/Loader";
const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError } = useSelector((state) => {
    
    return state.order;
  });
  const {user} = useSelector(state=>state.auth)
  useEffect(() => {
    async function allOrders()
    {
      await dispatch(getAllOrders())
    }
    allOrders()
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
    {<Order order={orders} />}
    </ComponentLayout>
  );
};

export default OrderPage;
