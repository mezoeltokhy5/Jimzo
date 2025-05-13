import React, { useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  function getBrand({ brandId }) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
    );
  }

  let { data, isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    getBrand,
    select: (data) => data?.data.data,
  });

  console.log(data);

  return (
    <>
      <div className="container flex flex-wrap justify-center items-center">
        {!isLoading ? (
          data.map((brand, index) => (
            <div key={index} brand={brand} className="w-1/4 p-3">
              <div>
                <button
                  onClick={() => getBrand({ brandId: brand._id })}
                  className=" text-center border border-gray-300 hover:shadow-lg hover:shadow-gray-300 scale-105 transition-all cursor-pointer"
                >
                  <img className="w-full" src={brand.image} alt={brand.name} />
                  <h2 className="p-3 bg-gray-300 text-2xl font-light">
                    {brand.name}
                  </h2>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className=" h-screen flex justify-center items-center">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}
