import z from "zod";

export const discountSchema = z.object({
  code: z.string().min(4, { message: "Please enter a correct code" }),
  amount: z.string().min(1, { message: "Please eneter a correct amount" }),
});

export type Discount = z.infer<typeof discountSchema>;
