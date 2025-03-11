"use client";

import { IProduct } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

const ProductDetails = ({ product }: { product: IProduct }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  console.log(product);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(true);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl border mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div>
          <Image
            src={product?.images[0]}
            alt={product.title}
            width={500}
            height={400}
            className="w-full h-72 object-cover rounded-lg"
            unoptimized
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500 text-sm mt-2">{product.category}</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            ${product.price}
          </p>
          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* Product Condition & Status */}
          <p className="text-sm text-gray-700 mt-2">
            Condition: <strong>{product.condition || "N/A"}</strong>
          </p>
          <p
            className={`text-sm font-semibold mt-2 ${
              product.status === "sold" ? "text-red-600" : "text-green-600"
            }`}
          >
            {product.status === "sold" ? "Sold Out" : "Available"}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={isAddedToCart}
              className={`px-4 py-2 rounded text-white ${
                isAddedToCart
                  ? "bg-gray-400"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isAddedToCart ? "Added to Cart" : "Add to Cart"}
            </button>

            <button
              onClick={handleAddToWishlist}
              disabled={isWishlisted}
              className={`px-4 py-2 rounded text-white ${
                isWishlisted
                  ? "bg-gray-400"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
