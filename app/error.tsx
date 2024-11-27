"use client";
import Image from "next/image";
import errorimage from "../public/error.png";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center py-3">
      <Image className="w-[200px] xl:w-[300px]" src={errorimage} alt="error" />
      <h2 className="text-lg py-1 font-bold xl:text-3xl">{error.message}</h2>
      <button
        className=" py-2 px-4 bg-[var(--purple)] hover:bg-[var(--purple-hover)] rounded-lg my-3 text-white xl:px-8 xl:py-3 text-lg xl:mt-5"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
