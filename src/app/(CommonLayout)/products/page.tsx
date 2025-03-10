import AllProducts from "@/components/modules/product";
import DynamicFilter from "@/components/modules/product/DynamicFilter";
import { getProducts } from "@/services/Product";

type searchParams = Promise<{ [key: string]: string | undefined }>;

const AllProductsPage = async ({
  searchParams,
}: {
  searchParams: searchParams;
}) => {
  const query = await searchParams;
  const { page } = await searchParams;
  const { data } = await getProducts(page, "8", query);
  const { result, meta } = data;
  console.log(await searchParams);

  return (
    <div>
      <h1 className="p-8 flex items-center justify-center font-bold text-3xl bg-gray-100 mt-4 rounded-md container mx-auto">
        All Products
      </h1>
      <DynamicFilter></DynamicFilter>
      <AllProducts products={result} totalPage={meta.totalPage}></AllProducts>
    </div>
  );
};

export default AllProductsPage;
