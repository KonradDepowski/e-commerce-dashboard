import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a correct email" }),
  password: z
    .string()
    .min(6, { message: "Password must have min 6 characters" })
    .max(30, { message: "Password must have max 30 characters" })
    .nonempty(),
});

export type User = z.infer<typeof loginSchema>;
