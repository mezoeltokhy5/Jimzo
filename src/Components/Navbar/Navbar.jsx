import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let navigate = useNavigate();
  let { userData, setUserData } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }
  return (
    <>
      <nav className=" bg-[#f1e6d5] md:fixed top-0 inset-x-0 py-2 text-center capitalize">
        <div className="container flex flex-col md:flex-row justify-between items-center text-gray-500">
          <div className="flex flex-col md:flex-row space-x-3">
            <NavLink to="home">
              <img src={logo} width={110} alt="" />
            </NavLink>
            {userData && (
              <ul className="flex flex-col md:flex-row space-x-5 space-y-3 font-bold">
                <li className="hover:text-amber-700 ml-10 mr-1 mt-3 font-bold">
                  <NavLink to="home">Home</NavLink>
                </li>
                <li className="hover:text-amber-700">
                  <NavLink to="products">products</NavLink>
                </li>
                <li className="hover:text-amber-700">
                  <NavLink to="categories">categories</NavLink>
                </li>
                <li className="hover:text-amber-700 relative cursor-pointer">
                  <NavLink to="cart">
                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                    <span className=" text-white absolute left-[9px] text-[13px] top-[-2.5px]">
                      {cart ? cart.numOfCartItems : 0}
                    </span>
                  </NavLink>
                </li>
                <li className="hover:text-red-500 relative cursor-pointer">
                  <NavLink to="wishlist">
                    <i className="fa-solid fa-heart text-2xl"></i>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          <div className="">
            <ul className="flex flex-col md:flex-row space-x-2">
              <li className="space-x-2 text-black">
                <i className="fab fa-facebook-f hover:text-gray-500 cursor-pointer">
                  {" "}
                </i>
                <i className="fab fa-linkedin-in hover:text-gray-500 cursor-pointer"></i>
                <i className="fab fa-youtube hover:text-gray-500 cursor-pointer"></i>
                <i className="fab fa-twitter hover:text-gray-500 cursor-pointer"></i>
                <i className="fab fa-instagram hover:text-gray-500 cursor-pointer"></i>
              </li>
              {userData ? (
                <li
                  onClick={() => logOut()}
                  className="hover:text-amber-700 cursor-pointer"
                >
                  logout
                </li>
              ) : (
                <>
                  <li className="hover:text-amber-700">
                    <NavLink to="login">Login</NavLink>
                  </li>
                  <li className="hover:text-amber-700">
                    <NavLink to="">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
