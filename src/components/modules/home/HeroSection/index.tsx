"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { IProduct } from "@/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";

const HeroSection = ({ products }: { products: IProduct[] }) => {
  return (
    <div>
      <section className="relative     mx-auto w-full min-h-[80vh] flex flex-col items-center justify-center text-center bg-[#16a34a] text-white py-20 px-5 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#41d075] to-[#f8a86b] opacity-80 rounded-3xl blur-sm" />
        <div className="absolute inset-0 bg-opacity-30 backdrop-blur-md rounded-3xl" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-6xl font-extrabold leading-tight drop-shadow-lg">
            Buy & Sell Used Items with
            <span className="text-[#e7995e] ml-2">FIND IT AGAIN</span>
          </h1>
          <p className="mt-4 text-lg font-medium drop-shadow-md">
            Discover great deals or sell your pre-loved items securely and
            effortlessly.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-white text-[#16a34a] font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
              >
                BROWSE LISTING
              </motion.button>
            </Link>
            <Link href="/user/create-product">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-[#e7995e] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
              >
                ADD PRODUCT
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Swiper Carousel (Marketplace Products) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 mt-10 w-full"
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Pagination]}
            className="max-w-6xl "
          >
            {products.map((product, index) => {
              console.log(product);
              return (
                <SwiperSlide
                  className="flex items-center justify-center gap-6"
                  key={index}
                >
                  <div className="bg-white max-w-96 h-96  rounded-lg shadow-lg p-4">
                    <Image
                      src={product.images[0] || "/placeholder-image.jpg"}
                      alt={product.title}
                      width={300}
                      height={200}
                      className="rounded-md h-48 w-full object-cover"
                    />
                    <h3 className="mt-4 text-lg font-semibold text-gray-800">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{product.description}</p>
                    <div className="mt-4 text-[#16a34a] font-semibold">{`$${product.price}`}</div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>

        {/* Floating Dots Effect */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white opacity-20 rounded-full blur-2xl animate-pulse" />
      </section>
    </div>
  );
};

export default HeroSection;
