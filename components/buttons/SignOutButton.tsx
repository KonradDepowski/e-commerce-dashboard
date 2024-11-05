"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <button
      className=" absolute bottom-3 right-3 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 font-bold text-white"
      onClick={() => {
        router.push("/");
        signOut();
      }}
    >
      Logout
    </button>
  );
};
