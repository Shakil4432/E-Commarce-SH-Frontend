import ManageProducts from "@/components/modules/product/ManageProducts";
import { getProductsById } from "@/services/Product";
import React from "react";

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await getProductsById(page, "6");
  console.log(data);
  const { meta, result } = data.data;

  return (
    <div>
      <ManageProducts products={result} meta={meta}></ManageProducts>
    </div>
  );
};

export default ProductPage;
