import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[40vh]">
      <div className="text-center">
        <p className="text-4xl font-bold xl:text-7xl ">404</p>
        <p className="text-lg py-1 xl:text-2xl">Page Not Found</p>
        <Link href="/">
          <button className="mt-4 bg-[var(--purple)] hover:bg-[var(--purple-hover)] text-white xl:px-5 xl:py-3 rounded-xl">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
