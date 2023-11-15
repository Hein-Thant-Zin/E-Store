"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";
import getProducts from "@/actions/getProducts";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ProductList({ title }) {
  const sp = useSearchParams();
  const category = sp.get("category");
  const keyword = sp.get("keyword");

  const query = {
    filters: {
      ...(keyword && {
        name: {
          $containsi: keyword,
        },
      }),
      ...(category && {
        category: {
          slug: {
            $containsi: category,
          },
        },
      }),
    },
  };

  const {
    data: products,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(query),
  });

  //refetch on query params change
  useEffect(() => {
    refetch();
  }, [sp, refetch]);
  console.log(products);

  return (
    <section>
      <div className="container px-4 py-6 mx-auto lg:px-8">
        <h3 className="text-xl font-semibold text-center">{title}</h3>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {isPending ? (
            <p>loading...</p>
          ) : isError ? (
            <p>{error.message}</p>
          ) : (
            <>
              {products.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
