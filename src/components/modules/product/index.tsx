"use client";

import { Button } from "@/components/ui/button";
import TablePagination from "@/components/ui/core/SHTable/TablePagination";
import { addProduct, CartProduct } from "@/redux/features/cartSlice";
import { addProductToWishList } from "@/redux/features/wishListSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/types/product";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const AllProducts = ({
  products,
  totalPage,
}: {
  products: CartProduct[];
  totalPage: number;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const handleProductToCart = (product: IProduct) => {
    dispatch(addProduct(product));
    toast.success(`${product.title} added to cart`);
  };

  const handleProductToWishList = (product: IProduct) => {
    dispatch(addProductToWishList(product));
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-center flex-wrap gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border p-5 rounded-xl shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                width={200}
                height={200}
                className="w-72 h-40 object-cover rounded-lg"
              />
              <Link key={product.title} href={`/products/${product._id}`}>
                <h2 className="text-xl font-bold mt-3 text-gray-800 hover:text-green-600 transition-colors">
                  {product.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm font-medium">
                {product.category}
              </p>
              <p className="text-lg font-bold text-green-500 mt-1">
                ${product.price}
              </p>
              <p className="text-sm text-gray-600 font-semibold">
                Condition: {product.condition || "N/A"}
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  product.status === "sold" ? "text-red-500" : "text-green-500"
                }`}
              >
                {product.status === "sold" ? "sold Out" : "available"}
              </p>

              <div className="mt-4 flex justify-between items-center gap-2">
                <Button
                  onClick={() => handleProductToCart(product)}
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-all"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => handleProductToWishList(product)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all"
                >
                  <Heart size={20} className="text-white" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full text-lg font-semibold">
            No products found.
          </p>
        )}
      </div>
      <div className="flex items-center justify-center mt-6">
        <TablePagination totalPage={totalPage} />
      </div>
    </div>
  );
};

export default AllProducts;
