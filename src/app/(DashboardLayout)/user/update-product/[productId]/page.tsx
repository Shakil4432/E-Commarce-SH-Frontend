import UpdateProductForm from "@/components/modules/product/createProduct/UpdateProductForm";
import { getSingleProducts } from "@/services/Product";
import React from "react";

const UpdateProductPage = async ({ params }: { params: Promise<any> }) => {
  const { productId } = await params;
  const { data: product } = await getSingleProducts(productId);
  console.log(product);
  return (
    <div className="p-12">
      <UpdateProductForm product={product}></UpdateProductForm>
    </div>
  );
};

export default UpdateProductPage;
