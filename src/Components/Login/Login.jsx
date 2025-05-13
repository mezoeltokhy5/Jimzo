import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { setUserData } = useContext(UserContext);

  async function Login(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      localStorage.setItem("userToken", data.token);
      navigate("/home");
      setLoading(false);
      setUserData(data.token);
    } catch (err) {
      console.log(err.response.data.message);
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z]\w{5,10}$/, "password invalid")
      .required(),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: Login,
  });

  return (
    <>
      <div className="pt-8 h-screen mx-auto w-1/3">
        <h2 className="text-4xl font-extrabold text-amber-800 text-center pb-6 ">
          Login{" "}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              {apiError}
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-60 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {formik.errors.password}
            </div>
          )}
          {loading ? (
            <button
              type="submit"
              className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-md w-full sm:w-auto px-4 py-2 text-center"
            >
              <i className="fas fa-spinner fa-spin-pulse"></i>
            </button>
          ) : (
            <div className="flex justify-between items-center">
              <div className="w-1/2 flex justify-between items-center">
                <button
                  type="submit"
                  className="text-white bg-amber-800 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2 text-center"
                >
                  Login
                </button>
                <span className="text-gray-400 ">OR</span>
                <Link
                  to={"/"}
                  className="text-amber-800 hover:underline transition-all"
                >
                  Register
                </Link>
              </div>
              <Link
                to="/forgetPassword"
                className="text-red-400 w-1/4 hover:underline transition-all"
              >
                Forget Password
              </Link>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
