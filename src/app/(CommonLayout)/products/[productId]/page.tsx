"use client";

import ProductDetails from "@/components/modules/product/ProductDetails";
import { getSingleProducts } from "@/services/Product";
import { IProduct } from "@/types/product";
import { useEffect, useState } from "react";

interface ProductPageProps {
  params: { productId: string };
}

const ProductDetailsPage = ({ params }: ProductPageProps) => {
  const [data, setData] = useState<IProduct | null>(null);
  const { productId } = params;

  useEffect(() => {
    const setDataToPage = async () => {
      try {
        const response = await getSingleProducts(productId);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    setDataToPage();
  }, [productId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="p-8 flex items-center justify-center font-bold text-3xl bg-gray-100 mt-4 rounded-md container mx-auto">
        Product Details
      </h1>
      <ProductDetails product={data} />
    </div>
  );
};

export default ProductDetailsPage;
