"use client";

import { usePathname, useRouter } from "next/navigation";

type PaginationProps = {
  page: string | number;
  totalPages: number;
};

const PaginationList = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const paginationMoveHandler = (type: string) => {
    const pageValue = type === "prev" ? Number(page) - 1 : Number(page) + 1;
    const newUrl = `${pathname}?page=${pageValue}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-4 justify-center w-full mt-8 ">
      <button
        className="bg-[var(--purple)] hover:bg-[var(--purple-hover)] w-20 xl:w-24 py-2 rounded-lg disabled:bg-[var(--purple-disabled)] "
        onClick={() => paginationMoveHandler("prev")}
        disabled={Number(page) <= 1}
      >
        Previous
      </button>
      <button
        className="bg-[var(--purple)] hover:bg-[var(--purple-hover)] w-20 xl:w-24 py-2   rounded-lg disabled:bg-[var(--purple-disabled)] "
        onClick={() => paginationMoveHandler("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationList;
