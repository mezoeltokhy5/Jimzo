import React, { useContext, useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext.jsx";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className=" md:pt-12">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
