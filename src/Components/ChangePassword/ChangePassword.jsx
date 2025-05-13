import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../Loading/Loading";
import { useFormik } from "formik";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handelChangePassword(values) {
    try {
      setLoading(true);
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      localStorage.setItem("userToken", data.token);
      toast.success("success change password");
      formik.resetForm();
      setLoading(false);
      setApiError(null);
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.log(err);
      setLoading(false);
      setApiError(err.response?.data?.message || "An error occurred");
    }
  }

  let validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .matches(/^[A-Z]\w{5,10}$/, "password invalid ex(ahmed123)")
      .required(),
    password: Yup.string()
      .matches(/^[A-Z]\w{5,10}$/, "password invalid ex(ahmed123)")
      .required(),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password not match ")
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handelChangePassword,
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="pt-8 h-screen mx-auto w-1/3">
          <h2 className="text-4xl font-extrabold text-amber-800 text-center pb-6 ">
            <i className="fas fa-lock"></i> Password & Security
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentPassword}
                type="password"
                name="currentPassword"
                id="currentPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="currentPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-60 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Current Password
              </label>
            </div>
            {formik.errors.currentPassword &&
              formik.touched.currentPassword && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  {formik.errors.currentPassword}
                </div>
              )}
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                New Password
              </label>
            </div>
            {formik.errors.password && formik.touched.password && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {formik.errors.password}
              </div>
            )}
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                type="password"
                name="rePassword"
                id="rePassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm New Password
              </label>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            )}

            <button
              type="submit"
              className="text-white bg-amber-800 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2 text-center"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
}
