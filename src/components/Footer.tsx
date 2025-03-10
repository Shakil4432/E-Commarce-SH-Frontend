// components/Footer.tsx
import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-50  py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              SecondHand Marketplace is your go-to platform for buying and
              selling used items with ease and security.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-400 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gray-400 text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/listing"
                  className="hover:text-gray-400 text-sm"
                >
                  Post an Item
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/profile"
                  className="hover:text-gray-400 text-sm"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/messages" className="hover:text-gray-400 text-sm">
                  Messages
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/wishlist"
                  className="hover:text-gray-400 text-sm"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm">Email: support@secondhand.com</li>
              <li className="text-sm">Phone: +123 456 7890</li>
              <li className="text-sm">
                Address: 123 Marketplace St, City, Country
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-sm">
            &copy; 2025 SecondHand Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
