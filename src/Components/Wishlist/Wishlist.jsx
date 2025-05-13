import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";

export default function Wishlist(data) {
  let { getWishlist, wishlist, removeFav } = useContext(WishlistContext);
  let { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <div className="  ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-3/4 mx-auto text-sm text-left rtl:text-right text-gray-500">
            <tbody>
              {wishlist?.data?.map((product, index) => (
                <tr
                  key={index}
                  className="bg-white border-b   hover:bg-gray-50 "
                >
                  <td className="p-4">
                    <img
                      src={product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {product.title}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeFav(product.id)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="flex items-center">
                      <button
                        onClick={() => addProductToCart(product.id)}
                        className=" w-3/4 text-white bg-amber-800 rounded py-1 px-2"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
