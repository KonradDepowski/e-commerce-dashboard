import Image from "next/image";

import Link from "next/link";
import { productSchemaType } from "@/lib/models/db/Product";

const Product = ({ id, name, price, images }: productSchemaType) => {
  return (
    <Link href={`/dashboard/products/${id}`}>
      <li
        key={id}
        className="flex flex-col w-[200px] md:w-[250px] lg:w-[260px] bg-primary rounded-lg pb-1 shadow-2xl relative h-auto"
      >
        <div className="h-[120px] md:h-[170px] relative object-cover">
          <Image
            className="rounded-lg  object-cover object-center"
            src={images?.[0]}
            alt={name}
            fill
          />
        </div>
        <h2 className="text-lg md:text-xl md:p-2 text-center p-1 ">{name}</h2>
        <p className="text-lg md:text-xl md:p-2 text-center  ">${price}</p>
      </li>
    </Link>
  );
};

export default Product;
