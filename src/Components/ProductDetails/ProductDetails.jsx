import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  let { id } = useParams();

  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { favProduct, isInWishlist, toggleWishlist } =
    useContext(WishlistContext);
  let { addProductToCart } = useContext(CartContext);

  var mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  var relatedSliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  async function getProductDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
  }

  async function getRelatedProducts(categoryId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
    );
    setRelatedProducts(data.data);
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  useEffect(() => {
    if (productDetails.category?._id) {
      getRelatedProducts(productDetails.category._id);
    }
  }, [productDetails]);

  return (
    <>
      <button className="ms-7 mt-2">
        <Link to="/home" className="text-amber-600 fa-2x">
          <i className="fas fa-arrow-left"></i>
        </Link>
      </button>
      <div className="container flex space-x-7 items-center pb-10">
        <div className="w-1/4">
          <Slider {...mainSliderSettings}>
            {productDetails.images?.map((image, index) => (
              <img
                src={image}
                key={index}
                className="w-full"
                alt={productDetails.title}
              />
            ))}
          </Slider>
        </div>
        <div className="w-3/4">
          <div>
            <div className="flex justify-between">
              <h2>{productDetails.title}</h2>
              <button
                className={` text-3xl ${
                  isInWishlist(productDetails.id)
                    ? "text-red-500"
                    : "text-red-300 hover:text-red-500"
                }`}
                onClick={() => toggleWishlist(productDetails.id)}
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
            <p className="my-5 text-gray-400">{productDetails.description}</p>
            <h3>{productDetails.category?.name}</h3>
            <div className="flex justify-between my-2">
              <h3>{productDetails.price} EGP</h3>
              <h3>
                <i className="fas fa-star text-yellow-400"></i>
                {productDetails.ratingsAverage}
              </h3>
            </div>
            <button
              onClick={() => addProductToCart(productDetails.id)}
              className="my-6 w-full text-white bg-amber-800 hover:bg-amber-700 rounded py-1"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <h3 className="text-xl font-semibold mb-4">Related Products</h3>
        <Slider {...relatedSliderSettings}>
          {relatedProducts.map((product) => (
            <div key={product._id} className="p-4 border rounded shadow-lg">
              <img
                src={product.images[0]}
                className="w-full h-44 object-cover"
                alt={product.title}
              />
              <h4 className="mt-2 text-lg font-bold">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h4>
              <p className="text-gray-500">{product.price} EGP</p>
              <Link
                to={`/productDetails/${product.id}`}
                className="text-amber-700 mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
