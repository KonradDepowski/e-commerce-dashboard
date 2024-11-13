"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Loader from "../Loader/Loader";
import Link from "next/link";

const Avatar = () => {
  const { user } = useUser();
  if (!user) {
    return <Loader />;
  }
  return (
    <Link className="flex justify-center items-center" href="/profile">
      <Image
        className="rounded-full"
        src={user?.imageUrl!}
        width={30}
        height={30}
        alt="avatar"
      />
    </Link>
  );
};

export default Avatar;
