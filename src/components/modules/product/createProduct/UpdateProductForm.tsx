"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { toast } from "sonner";
import SHImageUplader from "@/components/ui/core/SHImageUploader";
import { useState } from "react";
import { updateProduct } from "@/services/Product";
import { IProduct } from "@/types/product";

const UpdateProductForm = ({ product }: { product: IProduct }) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const form = useForm({
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      condition: product?.condition || "",
      status: product?.status || "",
      category: product?.category || "",
    },
  });

  console.log(imageFiles);

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const newData = {
      ...data,
      price: Number(data?.price),
    };
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(newData));
      imageFiles.forEach((file) => {
        formData.append("files", file);
      });

      const result = await updateProduct(product?._id, formData);
      console.log(result);
      if (result?.success) {
        toast.success(result.message);
      } else {
        toast.error(result?.message);
      }
      return result;
    } catch (error: any) {
      return Error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg border-2 w-full max-w-4xl">
        <div className="flex items-center justify-center rounded-full">
          {/* Logo or Title */}
          <div className="font-bold mb-10 text-4xl text-center">
            Update Your Product
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="title">Title</Label>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price Field */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="price">Price</Label>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="description">Description</Label>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="condition">Condition</Label>
                  <FormControl>
                    <select {...field} className="border p-2 rounded w-full">
                      <option value="new">New</option>
                      <option value="used">Used</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="category">Category</Label>
                  <FormControl>
                    <select {...field} className="border p-2 rounded w-full">
                      <option value="Mobile Phones & Accessories">
                        Mobile Phones & Accessories
                      </option>
                      <option value="Electronics & Gadgets">
                        Electronics & Gadgets
                      </option>
                      <option value="Home & Garden">Home & Garden</option>
                      <option value="Sports & Outdoors">
                        Sports & Outdoors
                      </option>
                      <option value="Books & Magazines">
                        Books & Magazines
                      </option>
                      <option value="Clothing & Accessories">
                        Clothing & Accessories
                      </option>
                      <option value="Pet Supplies">Pet Supplies</option>
                      <option value="Toys & Hobbies">Toys & Hobbies</option>
                      <option value="Health & Beauty">Health & Beauty</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="status">Status</Label>
                  <FormControl>
                    <select {...field} className="border p-2 rounded w-full">
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Images Field */}
            <div className="mt-2">
              <Label className="mb-3" htmlFor="images">
                Images
              </Label>
              <SHImageUplader
                imageFiles={imageFiles}
                setImageFiles={setImageFiles}
              ></SHImageUplader>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:col-span-2 bg-[#16a34a] hover:bg-[#16a34a] mt-4"
            >
              {isSubmitting ? "UPDATING PRODUCT..." : "UPDATE PRODUCT"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProductForm;
