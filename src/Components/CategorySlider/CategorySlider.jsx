import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
  const [category, setCategory] = useState([]);

  async function getRecentCategory() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories `
      );
      console.log(data.data);
      setCategory(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getRecentCategory();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 7,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <Slider {...settings}>
        {category?.map((category, index) => (
          <div key={index}>
            <img
              src={category.image}
              className="w-full h-[250px] mt-4"
              alt=""
            />
            <h3>{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
