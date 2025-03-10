import ManageSalesProducts from "@/components/modules/home/Products/SalseProduct";
import { getSalesById } from "@/services/Product";

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await getSalesById(page, "6");
  console.log(data);
  const { meta, result } = data.data;

  return (
    <div>
      <ManageSalesProducts products={result} meta={meta}></ManageSalesProducts>
    </div>
  );
};

export default ProductPage;
