import { fetchProducts } from "@/lib/actions/fetchProducts";
import React, { Suspense } from "react";
import Product from "../products/Product";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import ProdcutsList from "../products/ProdcutsList";
import Loader from "../Loader/Loader";

const ProductsPage = async () => {
  return (
    <section className="p-4 w-full">
      <ul className="flex flex-wrap justify-center md:justify-start gap-4">
        <Link href="/dashboard/products/new">
          <li className="flex flex-col justify-center items-center w-[200px] md:w-[250px] lg:w-[280px] bg-primary rounded-lg shadow-2xl relative h-[250px] lg:h-[320px] hover:scale-[1.02] transition-all">
            <FaPlus className="text-xl xl:text-2xl" />
          </li>
        </Link>
        <Suspense fallback={<Loader />}>
          <ProdcutsList />
        </Suspense>
      </ul>
    </section>
  );
};

export default ProductsPage;
