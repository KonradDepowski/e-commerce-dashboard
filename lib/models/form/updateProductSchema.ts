import z from "zod";
const categories = ["lifestyle", "sneakers", "football", "running"] as const;
const sex = ["unisex", "men", "women"] as const;

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must have min 3 characters" })
    .max(20, { message: "Name must have max 20 characters" }),
  category: z.enum(categories, { message: "Please choose category" }),
  sex: z.enum(sex, { message: "Please choose sex" }),
  price: z.string().nonempty({ message: "Enter a price" }),
  images: z.any(),
  offer: z.boolean(),
});

export type Product = z.infer<typeof updateProductSchema>;
