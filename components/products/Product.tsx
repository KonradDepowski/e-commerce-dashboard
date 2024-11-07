import Image from "next/image";

import Link from "next/link";
import { productSchemaType } from "@/lib/models/db/Product";

const Product = ({ id, name, price, images }: productSchemaType) => {
  return (
    <Link href={`/dashboard/products/${id}`}>
      <li
        key={id}
        className="flex flex-col w-[200px] md:w-[250px] lg:w-[280px] bg-primary rounded-lg shadow-2xl relative h-[250px] lg:h-[320px] hover:scale-[1.05] transition-all"
      >
        <div className="min-h-[65%] relative ">
          <Image
            className="rounded-lg  object-cover object-center "
            src={images?.[0]}
            alt={name}
            fill
          />
        </div>
        <div className="min-h-[35%] flex flex-col items-center justify-center gap-1">
          <h2 className="text-lg md:text-xl  font-bold text-[var(--green-main)] text-center ">
            {name}
          </h2>
          <p className="text-lg md:text-xl text-center  text-[var(--dark-300)] ">
            ${price}
          </p>
        </div>
      </li>
    </Link>
  );
};

export default Product;