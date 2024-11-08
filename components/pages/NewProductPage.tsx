"use client";
import { createProduct } from "@/lib/actions/createProduct";

import { Product } from "@/lib/models/form/productSchema";
import ProductForm from "../forms/ProductForm";
import { updateOfferProduct } from "@/lib/actions/updateOfferProduct";

const NewProductPage = () => {
  const productHandler = async (data: Product, urls: string[]) => {
    console.log(data);

    const productData = {
      ...data,
      images: urls,
      price: Number(data.price),
      offer: data.offer,
    };

    try {
      if (data.offer) {
        await updateOfferProduct();
      }
    } catch (updateError) {
      console.error("Failed to update offer product:", updateError);
    }

    await createProduct(productData);
  };

  return (
    <section className="flex flex-col justify-center items-center gap-10 w-full mt-16">
      <h1 className="text-xl text-[var(--green-main)] font-bold lg:text-3xl">
        Create new product
      </h1>
      <ProductForm
        offerValue={false}
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
