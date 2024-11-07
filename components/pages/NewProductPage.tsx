"use client";
import { createProduct } from "@/lib/actions/createProduct";

import { Product } from "@/lib/models/form/productSchema";
import ProductForm from "../forms/ProductForm";

const NewProductPage = () => {
  const productHandler = async (data: Product, urls: string[]) => {
    const productData = {
      ...data,
      images: urls,
      price: Number(data.price),
      offer: false,
    };

    try {
      await createProduct(productData);
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center gap-10 w-full mt-16">
      <h1 className="text-xl text-[var(--green-main)] font-bold lg:text-3xl">
        Create new product
      </h1>
      <ProductForm
        nameValue=""
        categoryValue={undefined}
        sexValue={undefined}
        priceValue=""
        handleProduct={productHandler}
      />
    </section>
  );
};

export default NewProductPage;
