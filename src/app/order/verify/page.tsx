"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { verifyOrder } from "@/services/Order";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

const PaymentDetails = () => {
  const searchParams = useSearchParams();
  const userInfo = useUser();
  const orderId = searchParams.get("order_id");

  const [verifyStatus, setVerifyStatus] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!userInfo?.user?.email) return;
        const verifyData = await verifyOrder(orderId);
        setVerifyStatus(verifyData?.data[0]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [userInfo?.user?.email]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Order Verification</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Order ID:</strong> {verifyStatus?.order_id}
            </p>
            <p>
              <strong>Amount:</strong> {verifyStatus?.currency}
              {verifyStatus?.amount?.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong>
              <Badge
                variant={
                  verifyStatus?.bank_status === "Success"
                    ? "default"
                    : "destructive"
                }
              >
                {verifyStatus?.bank_status}
              </Badge>
            </p>
            <p>
              <strong>Date:</strong> {new Date().toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Method:</strong> {verifyStatus?.method}
            </p>
            <p>
              <strong>Transaction ID:</strong> {verifyStatus?.bank_trx_id}
            </p>
            <p>
              <strong>Invoice No:</strong> {verifyStatus?.invoice_no}
            </p>
            <p>
              <strong>SP Code:</strong> {verifyStatus?.sp_code}
            </p>
            <p>
              <strong>SP Message:</strong> {verifyStatus?.sp_message}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Name:</strong> {verifyStatus?.name}
            </p>
            <p>
              <strong>Email:</strong> {verifyStatus?.email}
            </p>
            <p>
              <strong>Phone:</strong> {verifyStatus?.phone_no}
            </p>
            <p>
              <strong>Address:</strong> {verifyStatus?.address},{" "}
              {verifyStatus?.city}
            </p>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardHeader></CardHeader>
          <CardContent className="flex mt-5 items-center justify-center gap-2">
            <div>
              <Button className="bg-green-500 font-bold">View Order</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentDetails;
