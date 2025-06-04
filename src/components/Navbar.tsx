"use client";

import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { logout } from "@/services/AuthServices";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { protectedRoutes } from "@/constants";
import { FormEvent, useState } from "react";
import logo from "../assets/logo.png";
import { useAppSelector } from "@/redux/hooks";
import { wishlistProductsSelector } from "@/redux/features/wishListSlice";
import { orderProductsSelector } from "@/redux/features/cartSlice";

const Navbar = () => {
  const orderData = useAppSelector(orderProductsSelector);
  const wishListData = useAppSelector(wishlistProductsSelector);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { user, setIsLoading } = useUser();

  const [searchTerm, setSearchTerm] = useState("");

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathName.match(route))) {
      router.push("/login");
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    params.set("searchTerm", searchTerm);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <nav className="bg-gradient-to-r sticky top-0 z-50 from-[#16a34a] to-[#e7995e] p-4 border-b-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={60}
              height={60}
              className="transition-transform transform hover:scale-110"
            />
          </Link>
          <Link
            href="/"
            className="text-3xl text-white font-extrabold hover:text-[#e7995e] transition-all"
          >
            FIND IT AGAIN
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-white font-medium">
          <Link href="/" className="hover:text-[#e7995e] transition-colors">
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-[#e7995e] transition-colors"
          >
            Products
          </Link>
          <Link
            href="/dashboard/profile"
            className="hover:text-[#e7995e] transition-colors"
          >
            Profile
          </Link>
        </div>

        {/* Search Bar (wrapped in a form to catch Enter) */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md bg-white w-80 placeholder-gray-400 shadow-md transition-all focus:ring-2 focus:ring-[#16a34a]"
          />
          <button
            type="submit"
            className="bg-white text-black p-2 rounded-md shadow-md hover:bg-[#e7995e] transition-all"
          >
            <FiSearch size={20} />
          </button>
        </form>

        <div className="flex justify-center items-center space-x-4 text-sm">
          <div className="relative flex justify-center items-center border-2 border-white rounded-full p-2 hover:bg-[#e7995e] transition-all">
            <Link href="/user/wishlist" className="text-white hover:text-black">
              <FaHeart size={20} />
            </Link>
            {wishListData.length > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 py-0.5">
                {wishListData.length}
              </div>
            )}
          </div>

          {/* Cart Icon with Indicator */}
          <div className="relative flex justify-center items-center border-2 border-white rounded-full p-2 hover:bg-[#e7995e] transition-all">
            <Link href="/cart" className="text-white hover:text-black">
              <FaShoppingCart size={20} />
            </Link>
            {orderData.length > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 py-0.5">
                {orderData.length}
              </div>
            )}
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/user">
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                className="text-[#16a34a] border-white hover:border-[#16a34a] transition-all"
              >
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-white"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-[#16a34a] p-4 rounded-xl shadow-xl">
          <Link href="/" className="text-white hover:text-[#e7995e]">
            Home
          </Link>
          <Link href="/products" className="text-white hover:text-[#e7995e]">
            Products
          </Link>
          <Link
            href="/dashboard/profile"
            className="text-white hover:text-[#e7995e]"
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
