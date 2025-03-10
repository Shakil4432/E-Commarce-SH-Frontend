"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getOrder } from "@/services/Order";
import { useUser } from "@/context/UserContext";
import { IOrder } from "@/types/order";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const user = useUser();

  useEffect(() => {
    const getOrderData = async () => {
      const orders = await getOrder(user.user?.email);
      setOrders(orders?.data || []);
    };

    getOrderData();
  }, []);

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center text-[#16a34a] mb-6">
        Your Orders
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id.slice(-6)}</TableCell>
                <TableCell>
                  {order.products.map((product, index) => (
                    <div key={index}>
                      <span className="font-semibold text-gray-700">
                        {product.productId}
                      </span>
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {order.products.reduce((sum, item) => sum + item.quantity, 0)}
                </TableCell>
                <TableCell className="font-semibold text-gray-700">
                  ${order.totalPrice}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default Orders;
