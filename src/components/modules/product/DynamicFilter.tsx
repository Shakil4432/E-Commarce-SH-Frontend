"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getConditions,
  getProductCategories,
  getSearchTerm,
  getStatus,
} from "@/services/Product";

export default function DynamicFilter() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [search, setSearch] = useState<string[]>([]);
  console.log(categories, conditions);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          categoriesResponse,
          conditionsResponse,
          statusResponse,
          searchResponse,
        ] = //+
          await Promise.all([
            getProductCategories(),
            getConditions(),
            getStatus(),
            getSearchTerm(),
          ]);

        setCategories(categoriesResponse); //+
        setConditions(conditionsResponse); //+
        setStatus(statusResponse);
        setSearch(searchResponse);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch filters");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log(params);
    if (value) {
      params.set(query, value.toString());
    } else {
      params.delete(query);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-6 flex items-center justify-center gap-40 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        {searchParams.toString().length > 0 && (
          <Button
            onClick={() => router.push(`${pathname}`, { scroll: false })}
            size="sm"
            className="bg-black hover:bg-gray-700 ml-5"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Product Categories */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Product Category</h2>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => handleSearchQuery("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {[...new Set(categories)].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Condition</h2>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => handleSearchQuery("condition", e.target.value)}
        >
          {[...new Set(conditions)].map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Status</h2>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => handleSearchQuery("status", e.target.value)}
        >
          {[...new Set(status)].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
