import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ImagesList = ({
  images,
  deleteImage,
  setImages,
}: {
  images: string[];
  deleteImage: ((url: string) => void) | undefined;
  setImages: Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <>
      {deleteImage &&
        images?.map((url) => (
          <div className="relative">
            <FaTrashAlt
              onClick={() => {
                deleteImage(url);
                setImages((prev) => prev.filter((it) => it !== url));
              }}
              className="text-[var(--error)] absolute top-2 right-2 cursor-pointer"
            />
            <Image
              className="object-cover w-full h-full"
              key={url}
              width={100}
              height={100}
              src={url}
              alt="image preview"
            />
          </div>
        ))}
    </>
  );
};

export default ImagesList;
