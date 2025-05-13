import React, { useContext, useEffect, useState } from "react";
import style from "./AllOrders.module.css";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";

export default function AllOrders() {
  let { deleteProducts } = useContext(CartContext);

  useEffect(() => {
    deleteProducts();
  }, []);

  return (
    <>
      <h1 className="text-3xl">AllOrders</h1>
    </>
  );
}
