"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
const GoBackButton = () => {
  const router = useRouter();
  return (
    <button className="text-xl xl:text-3xl py-3 " onClick={() => router.back()}>
      <FaLongArrowAltLeft className="hover:text-[var(--dark-500)] " />
    </button>
  );
};

export default GoBackButton;
