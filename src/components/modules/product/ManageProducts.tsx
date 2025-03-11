"use client";

import { deleteProduct } from "@/services/Product";
import { ColumnDef } from "@tanstack/react-table";
import { SHTable } from "@/components/ui/core/SHTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import TablePagination from "@/components/ui/core/SHTable/TablePagination";
import { IProduct } from "@/types/product";
import { toast } from "sonner";
import Image from "next/image";

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  condition: "new" | "used";
  images: string[];
  status: "available" | "sold";
};

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
const ManageProducts = ({
  products,
  meta,
}: {
  products: IProduct[];
  meta: TMeta;
}) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "images",
      header: () => <span className="text-[#16a34a] font-semibold">Image</span>,
      cell: ({ row }) => (
        <Image
          src={row.original.images[0]}
          width={500}
          height={500}
          alt="Product"
          className="w-16 h-16 rounded"
        />
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-semibold text-gray-500">
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="font-semibold text-gray-500">
          {row.original.description}
        </span>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <span className="font-semibold text-gray-500">
          ${row.original.price}
        </span>
      ),
    },
    {
      accessorKey: "condition",
      header: "Condition",
      cell: ({ row }) => (
        <span className="font-semibold text-gray-500">
          {row.original.condition}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`font-semibold  ${
            row.original.status === "available"
              ? "text-green-600"
              : "text-red-600"
          } `}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2 font-semibold">
          <Button
            className="bg-[#16a34a] text-white px-2 py-1 rounded-full"
            onClick={() =>
              router.push(`/user/update-product/${row.original._id}`)
            }
          >
            <Pencil size={20} className="text-white hover:text-blue-700" />
          </Button>
          <Button
            className="bg-red-600 text-white px-2 py-1 rounded-full"
            onClick={() => handleDelete(row.original._id)}
          >
            <Trash2 size={20} className="text-white hover:text-red-700" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-12">
      <h1 className="text-3xl p-6 flex items-center justify-center font-bold w-full bg-white">
        Manage Your Products
      </h1>
      <SHTable columns={columns} data={products} />
      <TablePagination totalPage={meta?.totalPage}></TablePagination>
    </div>
  );
};

export default ManageProducts;
