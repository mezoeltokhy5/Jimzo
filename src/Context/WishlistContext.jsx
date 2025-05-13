import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  let headers = { token: localStorage.getItem("userToken") };
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    getWishlist();
  }, []);
  async function favProduct(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      );
      console.log(data);
      toast.success(data.message);
      getWishlist();
    } catch (err) {
      console.log(err);
    }
  }
  async function getWishlist(productId) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );
      console.log(data);
      setWishlist(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function removeFav(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      console.log(data);
      setWishlist((prevWishlist) => ({
        ...prevWishlist,
        data: prevWishlist.data.filter((product) => product.id !== productId),
      }));
      toast.success(data.message);
    } catch (err) {
      console.log(err);
    }
  }
  function isInWishlist(productId) {
    return wishlist?.data?.some((product) => product.id === productId);
  }
  async function toggleWishlist(productId) {
    if (isInWishlist(productId)) {
      await removeFav(productId);
    } else {
      await favProduct(productId);
    }
  }
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        favProduct,
        getWishlist,
        removeFav,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
