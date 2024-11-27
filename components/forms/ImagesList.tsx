import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import Loader from "../Loader/Loader";
import { FaTrashAlt } from "react-icons/fa";

type ImagesListProps = {
  images: string[];
  deleteImage?: (url: string) => void;
  setImages: Dispatch<SetStateAction<string[]>>;
};

const ImagesList = ({ images, deleteImage, setImages }: ImagesListProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let loadedImages = 0;
    images.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedImages += 1;
        if (loadedImages === images.length) {
          setLoading(false);
        }
      };
    });
  }, [images]);

  if (loading) return <Loader />;

  return (
    <div className="flex gap-2 ">
      {images.map((url) => (
        <div key={url} className="relative flex ">
          <img
            className="w-[100px] h-[100px] object-cover"
            src={url}
            alt="Preview"
          />
          {deleteImage && (
            <button
              onClick={() => {
                deleteImage(url);
                setImages((prev) => prev.filter((it) => it !== url));
              }}
              className="absolute top-2 right-2"
            >
              <FaTrashAlt className="text-[var(--error)]" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImagesList;
