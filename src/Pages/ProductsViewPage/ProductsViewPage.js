import React, { useEffect } from "react";
import ProductView from "../../Component/Products/ProductView/ProductView";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { productById } from "../../ReduxStore/Reducers/ProductReducer";
import Loader from "../../Component/Loader/Loader";
const ProductsViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { products, isLoading, error } = useSelector((state) => {
    return state.products;
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(productById(id));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return(<ComponentLayout>
      <Loader />
    </ComponentLayout>)
  }

  return (
    <ComponentLayout>
      {Object.keys(products).length ? (
        <ProductView products={products} />
      ) : (
        <div></div>
      )}
    </ComponentLayout>
  );
};

export default ProductsViewPage;
