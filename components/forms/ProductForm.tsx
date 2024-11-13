"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, productSchema } from "@/lib/models/form/productSchema";
import { lazy, ReactNode, Suspense, useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import { app } from "@/lib/database/firebase";
import { updateProductSchema } from "@/lib/models/form/updateProductSchema";

import Loader from "../Loader/Loader";
import ImagesList from "./ImagesList";
import { Checkbox } from "../ui/checkbox";
type ProdutFormProps = {
  nameValue: string;
  categoryValue: Category | undefined;
  sexValue: Sex | undefined;
  priceValue: string;
  offerValue: boolean;
  handleProduct: (data: Product, urls: string[]) => {};
  deleteImage?: (url: string) => void;
  dbImages?: string[];
};
type Category = "lifestyle" | "sneakers" | "football" | "running";
type Sex = "unisex" | "men" | "women";

const ProductForm = ({
  nameValue,
  categoryValue,
  sexValue,
  priceValue,
  offerValue,
  handleProduct,
  deleteImage,
  dbImages,
}: ProdutFormProps) => {
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [imageFileUrls, setImageFileUrls] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const storage = getStorage(app);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Product>({
    resolver: zodResolver(dbImages ? updateProductSchema : productSchema),
    defaultValues: {
      category: categoryValue,
      sex: sexValue,
      images: dbImages,
      offer: offerValue,
    },
  });

  const handleSubmitHandler = async (data: Product) => {
    if (!imageFiles && !dbImages) return;
    let urls: string[] = [];
    if (imageFiles) {
      const uploadFiles = Array.from(imageFiles).map((file) => {
        const name = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      });

      urls = await Promise.all(uploadFiles);
    }

    try {
      handleProduct(data, urls);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  useEffect(() => {
    if (imageFiles) {
      const newUrls = Array.from(imageFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setImageFileUrls(newUrls);

      return () => {
        newUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [imageFiles]);

  useEffect(() => {
    setImages(dbImages!);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <form
        className="w-[80%] max-w-[500px] flex flex-col gap-3"
        onSubmit={handleSubmit(handleSubmitHandler)}
      >
        <div className="">
          <Label className="sr-only" htmlFor="name">
            Name
          </Label>
          <Input
            className=""
            id="name"
            placeholder="Name"
            type="text"
            autoComplete="on"
            disabled={isSubmitting}
            defaultValue={nameValue}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-[var(--error)] text-[10px] sm:text-sm">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex gap-2 ">
          <div className="w-1/2">
            <Select
              onValueChange={(value: Category) => setValue("category", value)}
              defaultValue={categoryValue}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="sneakers">Sneakers</SelectItem>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="running">Running</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-[var(--error)] text-[10px] sm:text-sm">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <Select
              defaultValue={sexValue}
              onValueChange={(value: Sex) => setValue("sex", value)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unisex">Unisex</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
              </SelectContent>
            </Select>
            {errors.sex && (
              <p className="text-[var(--error)] text-[10px] sm:text-sm">
                {errors.sex.message}
              </p>
            )}
          </div>

          <div>
            <Input
              id="price"
              placeholder="Price"
              type="number"
              disabled={isSubmitting}
              {...register("price")}
              defaultValue={priceValue}
            />
            {errors.price && (
              <p className="text-[var(--error)] text-[10px] sm:text-sm">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Checkbox
            defaultChecked={offerValue}
            onCheckedChange={(value: boolean) => setValue("offer", value)}
            className="lg:w-5 lg:h-5"
            id="offer"
          />
          <Label
            className="text-[var(--dark-600)] lg:text-[16px] "
            htmlFor="offer "
          >
            Deal of the day
          </Label>
        </div>
        <div className="w-full flex ">
          <Input
            id="images"
            className="hidden"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              setValue("images", e.target.files);
              setImageFiles(e.target.files);
            }}
          />
          <Label
            className="border-[var(--dark-500)] border w-full flex  items-center px-2 h-9  lg:h-12 rounded-lg cursor-pointer"
            htmlFor="images"
          >
            <span className="text-[var(--dark-600)]">Select Images</span>
          </Label>
          {errors.images && (
            <p className="text-[var(--error)] text-[10px] sm:text-sm">
              {errors.images.message as ReactNode}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {imageFileUrls.map((url) => (
            <Image
              className=" object-contain"
              key={url}
              width={100}
              height={100}
              src={url}
              alt="image preview"
            />
          ))}
        </div>
        {deleteImage && (
          <div className="flex gap-2 flex-col">
            <h2 className="text-[var(--dark-600)]">Images from database:</h2>
            <div className="flex gap-2">
              <Suspense fallback={<Loader />}>
                <ImagesList
                  images={images}
                  deleteImage={deleteImage}
                  setImages={setImages}
                />
              </Suspense>
            </div>
          </div>
        )}

        <Button
          disabled={isSubmitting}
          className="bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white lg:h-12 lg:text-lg"
        >
          Create Product
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
