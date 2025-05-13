import React, { useState } from "react";
import style from "./MainSlider.module.css";
import Slider from "react-slick";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import img1 from "../../assets/images/blog-img-1.jpeg";
import img2 from "../../assets/images/slider-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <>
      <div className="flex flex-wrap my-2">
        <div className="w-3/4">
          <Slider {...settings}>
            <img src={slider1} className="w-full h-[450px]" alt="" />
            <img src={slider2} className="w-full h-[450px]" alt="" />
            <img src={slider3} className="w-full h-[450px]" alt="" />
          </Slider>{" "}
        </div>
        <div className="w-1/4">
          <img src={img1} className="w-full h-[225px]" alt="" />
          <img src={img2} className="w-full h-[225px]" alt="" />
        </div>
      </div>
    </>
  );
}
