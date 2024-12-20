import { fetchSingleOrder } from "@/lib/actions/order";
import React from "react";
import GoBackButton from "../buttons/GoBackButton";
import OrderItemDetails from "../orders/OrderItemDetails";
import StatusChange from "../orders/StatusChange";

const OrderDetailPage = async ({ params }: { params: { id: string } }) => {
  const order = await fetchSingleOrder(params.id);
  const orderProductInfo = order[0].products;
  const orderId = params.id;
  const date = order[0].date;

  const discount = order[0].discount !== "" ? `${order[0].discount}%` : "0%";
  return (
    <section className="p-3 max-w-[1500px] m-auto md:min-h-[60vh] w-full ">
      <h2 className="text-xl py-2 font-bold md:text-2xl text-center xl:text-3xl xl:pb-8 ">
        Order Details
      </h2>
      <GoBackButton />
      <div className=" flex flex-col md:flex-row md:flex-wrap ">
        <div className="py-2 md:w-1/2 md:py-0 ">
          <div>
            <h3 className="text-lg font-bold py-1  text-[var(--green-main)] md:w-full xl:text-2xl">
              Order Info
            </h3>
            <p className="flex gap-2 pt-2">
              <span className="text-[var(--dark-600)] md:text-lg font-bold">
                Order Id:
              </span>
              <span className="text-gray-600 md:text-lg">{orderId}</span>
            </p>

            <p className="flex  gap-2">
              <span className="text-[var(--dark-600)]  md:text-lg font-bold">
                Date:
              </span>
              <span className="text-gray-600 md:text-lg">
                {date.toLocaleDateString()} {""}
                {date.toLocaleTimeString()}
              </span>
            </p>
            <p className="flex  gap-2">
              <span className="text-[var(--dark-600)] md:text-lg font-bold">
                Total Amount:
              </span>
              <span className="text-gray-600 md:text-lg">
                ${order[0].totalAmount}
              </span>
            </p>
            <p className="flex  gap-2">
              <span className="text-[var(--dark-600)] md:text-lg font-bold">
                Discount
              </span>
              <span className="text-gray-600 md:text-lg">{discount}</span>
            </p>
          </div>
          <div>
            <div>
              <div className="flex gap-2  ">
                <p className="flex  gap-2">
                  <span className="text-[var(--dark-600)] md:text-lg font-bold">
                    Full Name:
                  </span>
                  <span className="text-gray-600 md:text-lg">
                    {order[0].deliveryData.firstName}
                  </span>
                  <span className="text-gray-600 md:text-lg">
                    {order[0].deliveryData.lastName}
                  </span>
                </p>
              </div>
              <p className="flex  gap-2">
                <span className="text-[var(--dark-600)] md:text-lg font-bold">
                  Phone:
                </span>
                <span className="text-gray-600 md:text-lg">
                  {order[0].deliveryData.phone}
                </span>
              </p>
              <p className="flex  gap-2">
                <span className="text-[var(--dark-600)] md:text-lg font-bold">
                  Country:
                </span>
                <span className="text-gray-600 md:text-lg">
                  {order[0].deliveryData.country}
                </span>
              </p>
              <p className="flex  gap-2">
                <span className="text-[var(--dark-600)] md:text-lg font-bold">
                  Town:
                </span>
                <span className="text-gray-600 md:text-lg">
                  {order[0].deliveryData.postalCode}
                </span>
                <span className="text-gray-600 md:text-lg">
                  {order[0].deliveryData.town}
                </span>
              </p>
              <p className="flex  gap-2">
                <span className="text-[var(--dark-600)] md:text-lg font-bold">
                  Address:
                </span>
                <span className="text-gray-600 md:text-lg">
                  {order[0].deliveryData.street}
                </span>
                <span className="text-gray-600 md:text-lg">
                  {order[0].deliveryData.houseNumber}
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-[var(--dark-600)] md:text-lg font-bold">
              Status:
            </span>
            <StatusChange defaultValue={order[0].status} orderId={orderId} />
          </div>
        </div>

        <div className="md:w-1/2 max-h-[10vh]">
          <h3 className="text-lg font-bold py-1  text-[var(--green-main)] xl:text-2xl">
            Products Ordered
          </h3>
          <div id="scroll" className="h-[500px] overflow-y-scroll">
            <ul className="flex flex-col justify-center py-3 items-center gap-3">
              {orderProductInfo.map((order) => (
                <OrderItemDetails
                  key={order._id}
                  id={order._id!}
                  name={order.name}
                  image={order.images![0]}
                  size={order.size}
                  price={order.price}
                  quantity={order.quantity}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailPage;
