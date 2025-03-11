"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getProductCategories } from "@/services/Product";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";

const Category = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { setIsLoading } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categories = await getProductCategories();
        const uniqueCategories = [...new Set(categories)];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch categories");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategory = (category: string) => {
    const page = searchParams.get("page") || "1";
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.set("category", category);
    updatedSearchParams.set("page", "1");

    router.push(`/products?${updatedSearchParams.toString()}`);
  };

  return (
    <div className="container mx-auto px-4">
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-10 text-[#16a34a] drop-shadow-lg">
          Browse by Category
        </h2>

        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          freeMode={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 40 },
          }}
          modules={[FreeMode, Pagination]}
          className="px-6"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Card
                  className="p-6 flex flex-col items-center justify-center h-48 shadow-lg cursor-pointer bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300"
                  onClick={() => handleCategory(category)}
                >
                  <CardContent className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-20 h-20 bg-[#16a34a] bg-opacity-10 rounded-full shadow-inner"></div>
                    <p className="mt-4 font-semibold text-lg text-gray-700">
                      {category}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Category;
