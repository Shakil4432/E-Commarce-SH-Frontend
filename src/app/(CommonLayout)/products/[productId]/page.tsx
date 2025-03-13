"use client";

import ProductDetails from "@/components/modules/product/ProductDetails";
import { getSingleProducts } from "@/services/Product";
import { IProduct } from "@/types/product";
import { useEffect, useState, use } from "react";

interface ProductPageProps {
  params: Promise<{ productId: string }>; // params is now a Promise
}

const ProductDetailsPage = ({ params }: ProductPageProps) => {
  const { productId } = use(params); // ✅ Unwrap the params Promise using React.use()
  const [data, setData] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleProducts(productId);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [productId]); // ✅ Correct dependency

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
