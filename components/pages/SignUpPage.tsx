"use client";
import { signupSchema } from "@/lib/models/form/signupSchema";
import { useSignUp, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ThemeToggle } from "../theme/ThemeToggle";

type FormValues = {
  password: string;
  firstName: string;
  lastName: string;
};

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
  });
  const token = useSearchParams().get("__clerk_ticket");
  if (!token) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-center text-[var(--error)] text-lg xl:text-2xl">
          No invitation token found.
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (user?.id) {
      router.push("/dashboard/products");
    }
  }, [user]);

  const handleSubmitHandler = async (data: FormValues) => {
    if (!isLoaded) return;

    try {
      if (!token) return null;

      const signUpAttempt = await signUp.create({
        strategy: "ticket",
        ticket: token!,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        toast.success("Successfully signed up!");
      }
    } catch (err: any) {
      toast.error(err.errors[0].message);
    }
  };
  return (
    <div className="w-full flex flex-wrap justify-center items-center h-screen">
      <div className="w-full h-[10%] self-start flex justify-end py-3 px-4 xl:px-6 xl:py-5 ">
        <ThemeToggle />
      </div>
      <div className="w-full h-[90%]  flex justify-center items-center">
        <form
          className="w-[70%] max-w-[500px]"
          onSubmit={handleSubmit(handleSubmitHandler)}
        >
          <div className="grid gap-2 mt-2">
            <div className="grid gap-1 ">
              <Label className="sr-only" htmlFor="firstName">
                Fist Name
              </Label>
              <Input
                className="lg:p-6 lg:px-3  border-[var(--dark-300)]"
                id="firstName"
                placeholder="First name"
                type="text"
                autoCapitalize="none"
                autoComplete="on"
                autoCorrect="off"
                disabled={isSubmitting}
                {...register("firstName" as const)}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                {errors.firstName.message}
              </p>
            )}
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="lastName">
                Last Name
              </Label>
              <Input
                className="lg:p-6 lg:px-3  border-[var(--dark-300)]"
                id="lastName"
                placeholder="Last name"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isSubmitting}
                {...register("lastName" as const)}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                {errors.lastName.message}
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
              <p className="text-red-500 text-[10px] md:text-[12px] px-2">
                {errors.password.message}
              </p>
            )}
            <Button
              className="lg:p-6 lg:px-3 text-white bg-[var(--purple)] hover:bg-[var(--purple-hover)] focus:bg-[var(--purple-hover)]"
              disabled={isSubmitting}
            >
              SignUp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
