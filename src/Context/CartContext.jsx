import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ product, children }) {
  let headers = { token: localStorage.getItem("userToken") };

  const [cart, setCart] = useState(null);

  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      );
      console.log(data);
      toast.success(data.message);
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getCart(productId) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      );
      console.log(data);

      setCart(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function updateProductCount(productId, count) {
    if (count > 0) {
      try {
        let { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          { count },
          { headers }
        );
        console.log(data);

        setCart(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      deleteProduct(productId);
    }
  }
  async function deleteProduct(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
      console.log(data);
      setCart(data);
      toast.success(data.message);
    } catch (err) {
      console.log(err);
    }
  }
  async function checkout(shippingAddress) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      );
      console.log(data);
      window.location.href = data.session.url;
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteProducts() {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      );
      console.log(data);
      setCart(null);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCart,
        cart,
        setCart,
        updateProductCount,
        deleteProduct,
        deleteProducts,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
