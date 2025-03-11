import { Button } from "@/components/ui/button";

import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Products = ({ products }: { products: IProduct[] }) => {
  console.log(products);

  return (
    <div>
      <section className="py-16 text-center bg-gray-50">
        <h2 className="text-4xl font-extrabold text-[#16a34a] drop-shadow-md">
          Featured Listings
        </h2>
        <p className="text-gray-600 mt-2">Find the best deals on used items</p>

        <div className="flex mt-6 items-center justify-center flex-wrap gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="border p-5 rounded-xl  bg-white transition-transform transform hover:scale-100 hover:shadow-xl"
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
                    product.status === "sold"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {product.status === "sold" ? "Sold Out" : "Available"}
                </p>

                <div className="mt-4 flex justify-between items-center gap-2">
                  <Link href={`/products/${product._id}`}>
                    {" "}
                    <Button className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-all">
                      See Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full text-lg font-semibold">
              No products found.
            </p>
          )}
        </div>
        <div>
          <Link href={"/products"}>
            <Button
              type="button"
              className=" mt-6 py-3 text-white bg-[#16a34a] font-medium rounded-full shadow-md hover:bg-opacity-90"
            >
              Load More
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Products;
