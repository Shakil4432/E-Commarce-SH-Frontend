import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      <main className="min-h-screen"> {children}</main>
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout;
