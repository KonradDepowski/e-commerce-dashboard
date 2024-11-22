"use client";
import {
  fetchProduct,
  updateOfferProduct,
  updateProduct,
} from "@/lib/actions/product";
import React, { useEffect, useState } from "react";
import ProductForm from "../forms/ProductForm";
import { Product } from "@/lib/models/form/productSchema";
import Loader from "../Loader/Loader";
import { productSchemaType } from "@/lib/models/db/Product";

const UpdateProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<productSchemaType | null>(null); // Set initial state to null
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const prd = await fetchProduct(params.id); // Await fetchProduct
        setProduct(prd);
        setImages(prd.images!);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetch();
  }, [params.id]);

  const handleProduct = async (data: Product, urls: string[]) => {
    const imagesUrls = [...images, ...urls];
    const productData = {
      ...data,
      images: imagesUrls,
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

    await updateProduct(productData, params.id);
  };

  const deleteImageHandler = (url: string) => {
    setImages((prev) => prev.filter((it) => it !== url));
  };

  return product ? (
    <section className="flex flex-col justify-center items-center gap-10 w-full mt-16">
      <h1 className="text-xl text-[var(--green-main)] font-bold lg:text-3xl">
        Edit Product
      </h1>
      <ProductForm
        nameValue={product.name}
        categoryValue={product.category}
        sexValue={product.sex}
        priceValue={product.price}
        offerValue={product.offer}
        dbImages={images}
        deleteImage={deleteImageHandler}
        handleProduct={handleProduct}
      />
    </section>
  ) : (
    <Loader />
  );
};

export default UpdateProductPage;
