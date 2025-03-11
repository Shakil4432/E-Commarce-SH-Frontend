import CallToAction from "@/components/modules/home/CallToAction";
import Category from "@/components/modules/home/Category";
import HeroSection from "@/components/modules/home/HeroSection";
import HowItWorks from "@/components/modules/home/HowItWorks";
import Products from "@/components/modules/home/Products";

import { getProducts } from "@/services/Product";

const HomePage = async () => {
  const { data } = await getProducts("1", "8");

  return (
    <div className="container mx-auto">
      <HeroSection products={data.result}></HeroSection>
      <Category></Category>
      <Products products={data.result}></Products>
      <HowItWorks></HowItWorks>
      <CallToAction></CallToAction>
    </div>
  );
};

export default HomePage;
