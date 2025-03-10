export interface IProduct {
  condition: "new" | "used";
  createdAt: Date;
  description: string;
  images: string[];
  price: number;
  status: "available" | "sold";
  title: string;
  quantity: number;
  category?:
    | "Mobile Phones & Accessories"
    | "Electronics & Gadgets"
    | "Clothing & Fashion"
    | "Home & Garden"
    | "Sports & Outdoors"
    | "Books & Magazines"
    | "Toys & Hobbies"
    | "Pet Supplies"
    | "Health & Beauty"
    | "Other";
  updatedAt: Date;
  userID: string;
  _id: string;
}
