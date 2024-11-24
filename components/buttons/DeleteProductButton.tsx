"use client";

import { deleteProduct } from "@/lib/actions/product";

const DeleteButton = ({ productId }: { productId: string }) => {
  const deleteProductHandler = async () => {
    await deleteProduct(productId);
  };

  return (
    <button
      onClick={() => deleteProductHandler()}
      className="bg-[var(--error)] lg:h-12 lg:text-lg rounded-lg hover:bg-[var(--error-hover)]"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
