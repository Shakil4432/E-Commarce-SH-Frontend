import ProductDetails from "@/components/modules/product/ProductDetails";
import { getSingleProducts } from "@/services/Product";

const ProductDetailsPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = params;
  const { data } = await getSingleProducts(productId);
  console.log(data);

  return (
    <div>
      <h1 className="p-8 flex items-center justify-center font-bold text-3xl bg-gray-100 mt-4 rounded-md container mx-auto">
        Product Details
      </h1>
      <ProductDetails product={data}></ProductDetails>
    </div>
  );
};

export default ProductDetailsPage;
