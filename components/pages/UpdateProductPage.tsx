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
  const [product, setProduct] = useState<productSchemaType | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const prd = await fetchProduct(params.id);
      setProduct(prd);
      setImages(prd.images!);
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

    if (data.offer) {
      await updateOfferProduct();
    }

    await updateProduct(productData, params.id);
  };

  const deleteImageHandler = (url: string) => {
    setImages((prev) => prev.filter((it) => it !== url));
  };

  return product ? (
    <section className="flex flex-col justify-center items-center gap-10 w-full mt-16 relative">
      <h1 className="text-xl text-[var(--green-main)] font-bold lg:text-3xl">
        Edit Product
      </h1>

      <ProductForm
        id={params.id}
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
