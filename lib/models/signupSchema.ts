import z from "zod";

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must have min 3 characters" })
    .max(20, { message: "First name must have max 20 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must have min 3 characters" })
    .max(20, { message: "Last name must have max 20 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must have min 6 characters" })
    .max(30, { message: "Password must have max 30 characters" })
    .nonempty(),
});

export type User = z.infer<typeof signupSchema>;
