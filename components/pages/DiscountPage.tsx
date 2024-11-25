import React from "react";
import { fetchDiscountCodes } from "@/lib/actions/discount";
import DiscountForm from "../forms/DiscountForm";

import DeleteDiscount from "../buttons/DeleteDiscount";

const DiscountPage = async () => {
  const discounts = await fetchDiscountCodes();
  if (!discounts) return;

  return (
    <section className="flex flex-col gap-10  max-w-[1200px] m-auto py-5 ">
      <DiscountForm />
      <div className="flex flex-col items-center xl:gap-4">
        <h2 className="text-lg text-[var(--green-main)] font-bold xl:text-2xl">
          Available Discount Codes
        </h2>
        <ul className="w-[90%] py-3 flex flex-col gap-2 max-w-[800px]">
          {discounts.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center border p-2 rounded-md border-[var(--dark-500)]"
            >
              <span className="text-[var(--dark-500)] xl:text-lg">
                {item.code}
              </span>
              <span className="text-[var(--dark-500)] xl:text-lg">
                {item.amount}%
              </span>
              <DeleteDiscount id={item._id!} />
            </li>
          ))}
        </ul>
        {discounts.length <= 0 && (
          <p className="text-[var(--purple)] md:text-md">
            Not Found any discount codes
          </p>
        )}
      </div>
    </section>
  );
};

export default DiscountPage;
