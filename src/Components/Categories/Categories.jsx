import React, { useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data?.data.data,
  });
  console.log(data);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-wrap justify-center my-7 gap-6 ">
          {data.map((category, index) => (
            <div key={index} category={category}>
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow transform transition-transform overflow-hidden hover:shadow-lg hover:shadow-gray-300 hover:scale-105">
                <Link to="/products">
                  <img
                    className=" h-[400px] rounded-t-lg"
                    src={category.image}
                    alt={category.name}
                  />
                </Link>
                <div className="px-5 py-5  bg-gray-200">
                  <Link to="/products">
                    <h5 className="text-2xl font-light tracking-tight text-gray-600 ">
                      {category.name}
                    </h5>
                  </Link>
                </div>
              </div>
            </div>
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
