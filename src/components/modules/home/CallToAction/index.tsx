import { Button } from "@/components/ui/button";
import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="container mx-auto">
      <section className="relative  my-12 py-20 text-center bg-gradient-to-r from-[#41d075] to-[#f8a86b] text-white rounded-xl shadow-lg  lg:mx-10 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-opacity-40 backdrop-blur-md rounded-3xl" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold drop-shadow-lg">
            Start Buying & Selling Today!
          </h2>
          <p className="mt-3 text-lg font-medium opacity-90">
            Join <span className="font-semibold">FindItAgain</span> and get the
            best deals on second-hand items.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Link href="/user/create-product">
              <Button className="bg-white text-[#16a34a] font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all">
                Sell an Item
              </Button>
            </Link>
            <Link href="/products">
              <Button className="bg-[#e7995e] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all">
                Browse Listings
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Elements for a Modern Look */}
        <div className="absolute -top-6 -left-6 w-20 h-20 bg-white opacity-20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white opacity-20 rounded-full blur-2xl animate-pulse" />
      </section>
    </div>
  );
};

export default CallToAction;
