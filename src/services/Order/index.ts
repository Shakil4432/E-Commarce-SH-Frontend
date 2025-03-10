"use server";

import { OrderData } from "@/app/order/verify/page";
import { TOrder } from "@/types/order";
import { cookies } from "next/headers";

const createOrder = async (newOrderData: TOrder) => {
  console.log(newOrderData);
  const token = (await cookies()).get("token")!.value;
  console.log(token);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newOrderData),
  });

  return response.json();
};

export const verifyOrder = async (order_id: string | null): Promise<any> => {
  const token = (await cookies()).get("token")!.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/order//verify?order_id=${order_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

export const getOrder = async (email: string | undefined) => {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Authentication token is missing");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/order/${email}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch order data");
  }

  return response.json();
};

export default createOrder;
