import { fetchProducts } from "@/lib/actions/fetchProducts";
import React from "react";
import Product from "./Product";

const ProdcutsList = async () => {
  const products = await fetchProducts();
  return (
    <>
      {products?.map((product) => (
        <Product
          offer={product.offer}
          key={product._id}
          id={product._id}
          sex={product.sex}
          name={product.name}
          category={product.category}
          images={product.images}
          price={product.price}
        />
      ))}
    </>
  );
};

export default ProdcutsList;