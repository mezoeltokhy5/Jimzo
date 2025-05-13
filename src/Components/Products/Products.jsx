import React, { useState } from "react";
import style from "./Products.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import RecentProducts from "../RecentProducts/RecentProducts";
import Loading from "../Loading/Loading";

export default function Products() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (data) => data?.data.data,
  });

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-wrap justify-center my-7">
          {data.map((product, index) => (
            <RecentProducts key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className=" h-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
}
