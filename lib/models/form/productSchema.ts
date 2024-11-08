import z from "zod";
const categories = ["lifestyle", "sneakers", "football", "running"] as const;
const sex = ["unisex", "men", "women"] as const;
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must have min 3 characters" })
    .max(20, { message: "Name must have max 20 characters" }),
  category: z.enum(categories, { message: "Please choose category" }),
  sex: z.enum(sex, { message: "Please choose sex" }),
  price: z.string().nonempty({ message: "Enter a price" }),
  images: z.any().refine((files) => files, { message: "Image is required." }),
  offer: z.boolean(),
  // .refine(
  //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //   `Max file size is 5MB.`
  // )
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // ),
});

export type Product = z.infer<typeof productSchema>;
