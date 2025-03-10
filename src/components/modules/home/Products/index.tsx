import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-5 max-w-7xl mx-auto">
          {products.map((item, index) => (
            <Card
              key={index}
              className="border hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2 bg-white rounded-2xl  border-gray-200"
            >
              <CardContent className="flex flex-col items-center p-5">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  width={180}
                  height={180}
                  className="rounded-lg w-full h-40 shadow-md"
                />
                <h3 className="mt-4 font-semibold text-lg text-gray-800">
                  {item.title}
                </h3>
                <p className="text-xl font-bold text-[#e7995e]">{item.price}</p>
                <Link href={`/products/${item._id}`}>
                  <Button className="mt-4 px-5 py-2 bg-[#16a34a] text-white font-medium rounded-full shadow-md hover:bg-opacity-90 transition-all">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
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
