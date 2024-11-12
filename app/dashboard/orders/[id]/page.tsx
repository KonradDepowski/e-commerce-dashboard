import React from "react";

const OrderDetail = ({ params }: { params: { id: string } }) => {
  return <div>{params.id}</div>;
};

export default OrderDetail;
