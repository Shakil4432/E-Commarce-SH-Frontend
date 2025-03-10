export interface TOrder {
  products: {
    productId: string;
    quantity: number;
  }[];
}

type TOrderDup = {
  productId: string;
  quantity: number;
};
export interface IOrder {
  createdAt: Date;
  products: TOrderDup[];
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "Paid";
  totalPrice: number;
  updatedAt: Date;
  userId: string;
  _id: string;
}
