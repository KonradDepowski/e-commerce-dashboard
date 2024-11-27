"use client";

import { useRouter } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/models/form/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ThemeToggle } from "../theme/ThemeToggle";
import Loader from "../Loader/Loader";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitHandler = async (data: FormValues) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn!.create({
        identifier: data.email,
        password: data.password,
      });

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        setLoading(true);
        router.push("/dashboard");
        toast.success("You logged in!");
      }
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "errors" in error &&
        Array.isArray(error.errors)
      ) {
        const errorsArray = (error as { errors: { message: string }[] }).errors;

        if (errorsArray.length > 0) {
          toast.error(errorsArray[0].message);
        }
      }
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center items-center h-screen">
      <div className="w-full h-[10%] self-start flex justify-end py-3 px-4 xl:px-6 xl:py-5 ">
        <ThemeToggle />
      </div>
      <div className="w-full h-[90%]  flex justify-center items-center">
        {loading ? (
          <Loader />
        ) : (
          <form
            className="w-[70%] max-w-[500px]"
            onSubmit={handleSubmit(handleSubmitHandler)}
          >
            <div className="grid gap-2 mt-2">
              <div className="grid gap-1 ">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  className="lg:p-6 lg:px-3  border-[var(--dark-300)]"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="on"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("email" as const)}
                />
              </div>
              {errors.email && (
                <p className="text-[var(--error)] text-[10px] md:text-[12px] px-2">
                  {errors.email.message}
                </p>
              )}
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  className="lg:p-6 lg:px-3 border-[var(--dark-300)]"
                  id="password"
                  placeholder="********"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...register("password" as const)}
                />
              </div>
              {errors.password && (
                <p className="text-[var(--error)] text-[10px] md:text-[12px] px-2">
                  {errors.password.message}
                </p>
              )}
              <Button
                className="lg:p-6 lg:px-3 text-white bg-[var(--purple)] hover:bg-[var(--purple-hover)] focus:bg-[var(--purple-hover)]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging" : "Login"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
