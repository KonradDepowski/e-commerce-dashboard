import UpdateProductPage from "@/components/pages/UpdateProductPage";
import React from "react";

const ProdcutDetail = ({ params }: { params: { id: string } }) => {
  return <UpdateProductPage params={params} />;
};

export default ProdcutDetail;
