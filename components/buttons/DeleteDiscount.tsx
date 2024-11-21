"use client";

import { deleteDiscountCode } from "@/lib/actions/discount";

const DeleteDiscount = ({ id }: { id: string }) => {
  return (
    <button
      onClick={() => deleteDiscountCode(id)}
      className=" px-2 py-1 text-sm  bg-[var(--error)] hover:bg-[var(--error-hover)] rounded-lg text-center xl:px-4 xl:py-2"
    >
      Delete
    </button>
  );
};

export default DeleteDiscount;
