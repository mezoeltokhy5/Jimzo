import React, { useContext, useState } from "react";
import style from "./RecentProducts.module.css";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { WishlistContext } from "../../Context/WishlistContext";

export default function RecentProducts({ product }) {
  let { addProductToCart } = useContext(CartContext);
  let { isInWishlist, toggleWishlist } = useContext(WishlistContext);

  return (
    <>
      <div className="product hover:border rounded-lg border-amber-700 hover:shadow-lg hover:shadow-amber-400 hover:scale-95 transform transition-transform overflow-hidden w-1/6 p-3">
        <div>
          <Link to={`/productDetails/${product.id}`}>
            <img
              src={product.imageCover}
              className="w-full"
              alt={product.title}
            />
            <h2 className="text-amber-700"> {product.category.name}</h2>
            <h2 className="">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </h2>
            <div className="flex justify-between my-2">
              <h3>{product.price} EGP</h3>
              <h3>
                <i className="fas fa-star text-yellow-400"></i>
                {product.ratingsAverage}
              </h3>
            </div>
          </Link>
          <div className="flex justify-between">
            <button
              onClick={() => addProductToCart(product.id)}
              className="btn w-3/4 text-white bg-amber-800 rounded py-1 hover:bg-amber-700"
            >
              ADD TO CART
            </button>
            <button
              className={`w-1/4 text-2xl ${
                isInWishlist(product.id)
                  ? "text-red-500"
                  : "text-red-300 hover:text-red-500"
              }`}
              onClick={() => toggleWishlist(product.id)}
            >
              <i className="fa-solid fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
