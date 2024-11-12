import { fetchProducts } from "@/lib/actions/product";
import React from "react";
import Product from "./Product";
import PaginationList from "../pagination/Pagination";

const ProdcutsList = async ({ page }: { page: number | string }) => {
  const { products, totalPages } = await fetchProducts(page, 9);
  if (!products) throw new Error();
  return (
    <>
      {(await products)?.map((product: any) => (
        <Product
          offer={product.offer}
          key={product._id}
          id={product._id.toString()}
          sex={product.sex}
          name={product.name}
          category={product.category}
          images={product.images}
          price={product.price}
        />
      ))}
      <div className="absolute bottom-10 right-12">
        {totalPages > 1 && (
          <PaginationList page={page} totalPages={totalPages} />
        )}
      </div>
    </>
  );
};

export default ProdcutsList;
