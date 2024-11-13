import OrderDetailPage from "@/components/pages/OrderDetailPage";

const OrderDetail = ({ params }: { params: { id: string } }) => {
  return <OrderDetailPage params={params} />;
};

export default OrderDetail;
