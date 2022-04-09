import React, { useEffect } from "react";
import Products from "../../Component/Products/Products";
import Loader from "../../Component/Loader/Loader";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
import { useDispatch, useSelector } from "react-redux";
import { getallProducts } from "../../ReduxStore/Reducers/ProductReducer";
const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getallProducts());
     
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <ComponentLayout>
        <Loader />
      </ComponentLayout>
    );
  }
 
  return (
    <ComponentLayout>
      {products?.length ? <Products products={products} />:<p>Not Available</p>}
    </ComponentLayout>
  );
};

export default ProductPage;
