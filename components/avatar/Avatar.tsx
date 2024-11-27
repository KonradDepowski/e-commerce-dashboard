"use client";
import { useUser } from "@clerk/nextjs";
import Loader from "../Loader/Loader";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AvatarComponent = () => {
  const { user } = useUser();
  if (!user) {
    return <Loader />;
  }
  return (
    <Link
      className="flex justify-center items-center"
      href="/dashboard/profile"
    >
      <Avatar>
        <AvatarImage src={user.imageUrl} alt="Avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default AvatarComponent;
