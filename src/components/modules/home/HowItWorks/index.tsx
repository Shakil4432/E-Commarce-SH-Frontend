import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorks = () => {
  return (
    <div>
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold text-[#16a34a] drop-shadow-lg">
          How It Works
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-5 max-w-6xl mx-auto">
          <Card className="transition-transform transform hover:scale-105 duration-300 bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-[#16a34a]">
                List Your Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Post your used item with images, details, and pricing.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-transform transform hover:scale-105 duration-300 bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-[#16a34a]">
                Find What You Need
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Browse and filter listings to discover great deals.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-transform transform hover:scale-105 duration-300 bg-white shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-[#16a34a]">
                Make a Deal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Chat with sellers and securely purchase your items.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
