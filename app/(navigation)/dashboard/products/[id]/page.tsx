import UpdateProductPage from "@/components/pages/UpdateProductPage";

const ProdcutDetail = ({ params }: { params: { id: string } }) => {
  return <UpdateProductPage params={params} />;
};

export default ProdcutDetail;
