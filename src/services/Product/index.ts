"use server";

import { cookies } from "next/headers";

export const createProduct = async (data: FormData) => {
  console.log(data);
  const token = (await cookies()).get("token")!.value;
  console.log(token);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/create-product`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }
  );

  return res.json();
};

export const getProducts = async (
  page?: string | undefined,
  limit?: string,
  query?: { [key: string]: string | undefined }
) => {
  const params = new URLSearchParams();
  if (query?.price) {
    params.append("price", query.price.toString());
  }
  if (query?.category) {
    params.append("category", query.category.toString());
  }
  if (query?.condition) {
    params.append("condition", query.condition.toString());
  }
  if (query?.status) {
    params.append("status", query.status.toString());
  }
  if (query?.searchTerm) {
    params.append("searchTerm", query.searchTerm.toString());
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/products?limit=${limit}&page=${page}&${params}`,
    {
      next: {
        tags: ["products"],
      },
    }
  );
  return res.json();
};

export const getSingleProducts = async (productId: string) => {
  const token = (await cookies()).get("token")!.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["products"],
      },
    }
  );
  return res.json();
};

export const updateProduct = async (
  productId: string,
  data: FormData
): Promise<any> => {
  const token = (await cookies()).get("token")!.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/${productId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }
  );
  return res.json();
};

export const getProductsById = async (
  page?: string | undefined,
  limit?: string
) => {
  const token = (await cookies()).get("token")!.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/byId?limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["products"],
      },
    }
  );
  return res.json();
};

export const getSalesById = async (
  page?: string | undefined,
  limit?: string
) => {
  const token = (await cookies()).get("token")!.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/sales?limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["products"],
      },
    }
  );
  return res.json();
};

export const getProductCategories = async () => {
  const { data } = await getProducts();

  const { result } = data;
  const categories: string[] = result.map(
    (result: { category: string }) => result?.category
  );
  return categories;
};

export const getConditions = async () => {
  const { data } = await getProducts("1", "8");

  const { result } = data;
  const conditions: string[] = result.map(
    (result: { condition: string }) => result?.condition
  );

  return conditions;
};

export const getStatus = async () => {
  const { data } = await getProducts("1", "8");

  const { result } = data;
  const status: string[] = result.map(
    (result: { status: string }) => result?.status
  );

  return status;
};

export const getSearchTerm = async () => {
  const { data } = await getProducts("1", "8");

  const { result } = data;
  const searchTerm: string[] = result.map(
    (result: { searchTerm: string }) => result?.searchTerm
  );

  console.log(searchTerm);
  return searchTerm;
};

export const deleteProduct = async (id: string) => {
  const token = (await cookies()).get("token")!.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
};
