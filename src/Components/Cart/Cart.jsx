import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getCart, cart, updateProductCount, deleteProduct, deleteProducts } =
    useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {!cart ? (
        <h1 className="text-4xl text-center pt-52 h-screen font-semibold text-amber-700">
          Cart Is Empty
        </h1>
      ) : (
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-3/4 mx-auto text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.data.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProductCount(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                          onClick={() =>
                            updateProductCount(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteProduct(product.product.id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {cart.numOfCartItems > 0 && (
            <div className="py-3 text-xl font-semibold bg-gray-300 text-black">
              <div className="container flex justify-between items-center">
                <div className="container space-x-32 flex items-center">
                  <div className="flex space-x-9">
                    <span>Total Price</span>
                    <span className="text-amber-600">
                      {cart.data.totalCartPrice} EGP
                    </span>
                  </div>
                  <div>
                    <Link
                      to={"/checkout"}
                      className="bg-amber-800 text-white p-2 m-2 rounded hover:bg-amber-700 transition-all"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
                <button
                  onClick={() => deleteProducts()}
                  className="w-1/3 font-medium text-red-600 hover:underline"
                >
                  Remove All
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
