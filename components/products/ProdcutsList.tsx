import { fetchProducts } from "@/lib/actions/product";
import React from "react";
import Product from "./Product";
import PaginationList from "../pagination/Pagination";
import { productSchemaType } from "@/lib/models/db/Product";

const ProdcutsList = async ({ page }: { page: number | string }) => {
  const { products, totalPages } = await fetchProducts(page, 9);
  if (!products) throw new Error();
  return (
    <>
      {(await products)?.map((product: productSchemaType) => (
        <Product
          offer={product.offer}
          key={product._id}
          id={product._id!.toString()}
          sex={product.sex}
          name={product.name}
          category={product.category}
          images={product.images}
          price={product.price}
        />
      ))}
      <div className="sm:absolute sm:bottom-2 sm:right-2 lg:bottom-10 lg:right-12">
        {totalPages > 1 && (
          <PaginationList page={page} totalPages={totalPages} />
        )}
      </div>
    </>
  );
};

export default ProdcutsList;
