"use client";

import { UserProfile } from "@clerk/nextjs";
import { SignOutButton } from "@/components/buttons/SignOutButton";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import type { Appearance } from "@clerk/types";

const ProfilePage = () => {
  const { theme } = useTheme();

  const appearanceConfig: Appearance | undefined =
    theme === "dark" ? { baseTheme: dark } : undefined;

  return (
    <section className="flex flex-row flex-wrap justify-center py-4 gap-5 w-full">
      <UserProfile routing="hash" appearance={appearanceConfig} />
      <SignOutButton />
    </section>
  );
};

export default ProfilePage;
