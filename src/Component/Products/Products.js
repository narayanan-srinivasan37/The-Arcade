import React from "react";
import { Grid } from "@mui/material";
import Product from "./Product/Product";
const Products = ({ products }) => {
  return (
    <Grid container sx={{ padding: "1rem" }} spacing={3}>
      {products.map((product, index) => {
        return (
          <Grid
            sx={{ height: 600 }}
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={4}
          >
            <Product product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Products;
