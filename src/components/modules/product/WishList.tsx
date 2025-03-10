"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeProductFromWishlist,
  wishlistProductsSelector,
} from "@/redux/features/wishListSlice";
import { addProduct } from "@/redux/features/cartSlice";
import Image from "next/image";
import { IProduct } from "@/types/product";
import { toast } from "sonner";

type TProduct = {
  title: string;
  description: string;
  price: number;
  condition?: "new" | "used";
  images: string[];
  userID: string;
  status?: "available" | "sold";
  category?:
    | "Mobile Phones & Accessories"
    | "Electronics & Gadgets"
    | "Clothing & Fashion"
    | "Home & Garden"
    | "Sports & Outdoors"
    | "Books & Magazines"
    | "Toys & Hobbies"
    | "Pet Supplies"
    | "Health & Beauty"
    | "Other";
};

const Wishlist = () => {
  const wishListData = useAppSelector(wishlistProductsSelector);
  const dispatch = useAppDispatch();

  const handleProductToCart = (product: IProduct) => {
    dispatch(addProduct(product));
    toast.success(`${product.title} added to cart`);
  };

  const removeFromWishlist = (id: string) => {
    dispatch(removeProductFromWishlist(id));
  };

  return (
    <motion.div
      className="container mx-auto p-6 bg-gray-50 rounded-lg border mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6 flex items-center gap-2">
        <Heart className="text-red-500" />
        Wishlist
      </h2>

      {wishListData.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="flex items-center justify-center flex-wrap gap-6">
          {wishListData.map((item, index) => (
            <div
              key={index}
              className="border w-72 p-5 rounded-xl shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <Image
                src={item.images[0]}
                width={300}
                height={300}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-3 text-gray-800 hover:text-green-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm font-medium">
                {item.category}
              </p>
              <p className="text-lg font-bold text-green-500 mt-1">
                ${item.price}
              </p>
              <p className="text-sm text-gray-600 font-semibold">
                Condition: {item.condition || "N/A"}
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  item.status === "sold" ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.status === "sold" ? "Sold Out" : "Available"}
              </p>

              <div className="mt-4 flex justify-between items-center gap-2">
                <Button
                  onClick={() => handleProductToCart(item)}
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-all"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => removeFromWishlist(item._id)}
                  className="bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:from-red-500 hover:to-red-700 transition-all"
                >
                  <Trash2 size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Wishlist;
