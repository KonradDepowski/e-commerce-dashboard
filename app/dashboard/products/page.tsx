import ProductsPage from "@/components/pages/ProductsPage";

const Products = ({
  searchParams,
}: {
  searchParams: { [page: string]: string | undefined };
}) => {
  return <ProductsPage searchParams={searchParams} />;
};

export default Products;
