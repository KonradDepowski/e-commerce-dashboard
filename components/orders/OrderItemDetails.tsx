import Image from "next/image";

type OrderItemDetailsProps = {
  id: string;
  image: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
};

const OrderItemDetails = ({
  id,
  image,
  name,
  size,
  price,
  quantity,
}: OrderItemDetailsProps) => {
  return (
    <li
      key={id}
      className="w-[80%] border-dashed border-b-2 border-b-gray-700 "
    >
      <div className="flex justify-center ">
        <div className="w-[40%]">
          <Image
            src={image}
            width={100}
            height={100}
            alt={name}
            className="max-w-28 max-h-20 object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-[60%]">
          <h5 className="text-md text-[var(--green-main)] text-center py-1 xl:text-lg 2xl:text-xl">
            {name}
          </h5>
          <p>
            <span className="2xl:text-md font-bold text-[var(--dark-600)]">
              Size:
            </span>{" "}
            <span className="text-gray-600 2xl:text-lg">{size}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-around py-3">
        <p>
          <span className="2xl:text-md font-bold text-[var(--dark-600)]">
            Price:
          </span>{" "}
          <span className="text-gray-600 2xl:text-md">${price}</span>
        </p>
        <p>
          <span className="2xl:text-md font-bold text-[var(--dark-600)]">
            Quantity:
          </span>{" "}
          <span className="text-gray-600 2xl:text-md">{quantity}</span>
        </p>
        <p>
          <span className="2xl:text-md font-bold text-[var(--dark-600)]">
            Total:
          </span>{" "}
          <span className="text-gray-600 2xl:text-md">
            ${Number(price) * Number(quantity)}
          </span>
        </p>
      </div>
    </li>
  );
};

export default OrderItemDetails;
