import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["homeProducts"],
    queryFn: getProducts,
    select: (res) => res?.data.data.slice(15, 25),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="px-4 py-10">
      <section className="text-center mb-12 ">
        <h1
          className="text-5xl  text-amber-800 mb-4"
          style={{ fontFamily: "Abril Fatface" }}
        >
          Welcome to Jimzo
        </h1>
        <p className="text-gray-600 text-lg">
          Discover the latest in Men's fashion and more.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Featured Products
        </h2>

        {!isLoading ? (
          <Slider {...sliderSettings}>
            {data.map((product) => (
              <div key={product._id} className="p-4">
                <div className="border rounded shadow hover:shadow-md transition">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full  object-cover"
                  />
                  <div className="p-2">
                    <h4 className="font-bold text-lg">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h4>
                    <p className="text-gray-500 text-sm mb-1">
                      {product.category.name}
                    </p>
                    <p className="text-gray-700 font-semibold">
                      {product.price} EGP
                    </p>
                    <Link
                      to={`/productDetails/${product.id}`}
                      className="text-amber-700 text-sm inline-block mt-2"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex justify-center items-center h-40">
            <Loading />
          </div>
        )}
      </section>
      <section className="text-center mt-16">
        <h3 className="text-xl font-bold mb-3 text-gray-800">
          Ready to explore more?
        </h3>
        <a
          href="/products"
          className="inline-block bg-amber-800 text-white px-6 py-2 rounded hover:bg-amber-700 transition"
        >
          View All Products
        </a>
      </section>
    </div>
  );
}
