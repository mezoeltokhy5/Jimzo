import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

// Custom Hook

export default function useProduct() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let response = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: 6000,
    // refetchInterval: 600,
    select: (data) => data?.data.data,
  });
  return response;
}
