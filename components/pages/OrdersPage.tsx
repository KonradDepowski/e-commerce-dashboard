import React from "react";
import OrderTable from "../orders/OrderTable";
import { fetchOrders } from "@/lib/actions/fetchOrders";

const OrdersPage = async () => {
  const orders = await fetchOrders();
  return <OrderTable data={orders} />;
};

export default OrdersPage;
