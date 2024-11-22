"use client";

import { Discount, discountSchema } from "@/lib/models/form/discountSchema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewDiscountCode } from "@/lib/actions/discount";
import { toast } from "sonner";

const DiscountForm = () => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Discount>({
    resolver: zodResolver(discountSchema),
  });

  const handleUppercase = (e: { target: { value: string } }) => {
    const uppercasedValue = e.target.value.toUpperCase();
    setValue("code", uppercasedValue, { shouldValidate: true });
  };

  const handleSubmitHandler = async (data: Discount) => {
    try {
      await addNewDiscountCode(data);
      reset({ code: "", amount: "" });
    } catch (error: any) {
      const er = error.message;

      if (
        er.includes("E11000 duplicate key error") &&
        er.includes("index: code_1")
      ) {
        toast.error(
          "This code is already in use. Please choose a different code"
        );
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitHandler)}
      className="flex flex-col justify-center items-center"
    >
      <h2 className="py-2 text-lg text-[var(--green-main)] font-bold xl:text-2xl xl:mb-5">
        Add New Discount Code
      </h2>
      <div className="flex gap-2 max-w-[1000px] ">
        <div className="w-[70%] max-w-[500px]">
          <Label className="sr-only" htmlFor="name">
            Code
          </Label>
          <Input
            type="text"
            id="code"
            placeholder="Code"
            {...register("code")}
            onChange={handleUppercase}
          />
          {errors.code && (
            <p className="text-[var(--error)] text-[10px] sm:text-sm">
              {errors.code.message}
            </p>
          )}
        </div>

        <div className="w-[30%] max-w-[500px]">
          <Label className="sr-only" htmlFor="amount">
            Amount
          </Label>
          <Input
            className=""
            type="number"
            id="amount"
            placeholder="Amount"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="text-[var(--error)] text-[10px] sm:text-sm">
              {errors.amount.message}
            </p>
          )}
        </div>
      </div>

      <Button
        className="my-3 mt-5 bg-[var(--purple)] hover:bg-[var(--purple-hover)] xl:w-[200px] xl:h-[40px] text-lg"
        type="submit"
      >
        Add Code
      </Button>
    </form>
  );
};

export default DiscountForm;
