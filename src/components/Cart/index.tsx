"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearCart,
  decrement,
  increment,
  orderProductsSelector,
  orderSelector,
  removeProduct,
  totalPriceSelector,
} from "@/redux/features/cartSlice";

import { TOrder } from "@/types/order";
import createOrder from "@/services/Order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Cart = () => {
  const orderData = useAppSelector(orderSelector);
  const products = useAppSelector(orderProductsSelector);
  const totalPrice = useAppSelector(totalPriceSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeProduct(id));
  };

  const handleIncrement = (id: string) => {
    dispatch(increment(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(decrement(id));
  };

  const handleCheckout = async () => {
    const newOrderData: TOrder = {
      products: orderData.products.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const result = await createOrder(newOrderData);
      console.log(result);
      if (result?.success) {
        toast.success(result.message, { id: result });
        dispatch(clearCart());
        router.push(`${result.data}`);
      } else {
        toast.error("Payment failed. Try again.");
      }
    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg border mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold  text-center text-green-700">
          Your Cart
        </h2>
        <div className="text-center">
          <Link
            href="/products"
            className="text-green-600 hover:text-green-800 text-lg font-medium transition-all"
          >
            <Button className="bg-green-600">Continue Shopping</Button>
          </Link>
        </div>
      </div>
      {products.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="flex items-center border p-5 rounded-xl  bg-white  justify-between"
            >
              <div className="flex items-center space-x-5">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover shadow-md"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-lg font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-3 mt-3">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-full font-bold text-lg hover:bg-gray-300 transition-all"
                      onClick={() => handleDecrement(item._id)}
                    >
                      -
                    </button>
                    <span className="text-lg font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-full font-bold text-lg hover:bg-gray-300 transition-all"
                      onClick={() => handleIncrement(item._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700 p-2 bg-red-100 rounded-full hover:bg-red-200 transition-all"
                onClick={() => handleRemoveFromCart(item._id)}
              >
                <FaTrash size={20} />
              </button>
            </div>
          ))}
          <div className="text-right text-2xl font-bold mt-6 text-green-700">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition-all font-semibold text-lg"
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
