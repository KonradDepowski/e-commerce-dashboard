import { fetchProducts } from "@/lib/actions/fetchProducts";
import React from "react";
import Product from "../products/Product";

const ProductsPage = async () => {
  const products = await fetchProducts();
  return (
    <section className="p-4 w-full">
      <ul className="flex flex-wrap justify-center md:justify-start gap-4">
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
      </ul>
    </section>
  );
};

export default ProductsPage;
