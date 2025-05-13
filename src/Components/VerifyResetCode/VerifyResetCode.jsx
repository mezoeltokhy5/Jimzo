import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../Loading/Loading";

export default function VerifyResetCode() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handelResetCode(values) {
    console.log(values);

    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      if (data.status === "Success") {
        navigate("/resetPassword");
      } else {
        setApiError("Unexpected response from server.");
      }
    } catch (err) {
      setApiError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    resetCode: Yup.string().required("Reset code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handelResetCode,
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="pt-8 h-screen mx-auto w-1/3">
          <h2 className="text-4xl font-extrabold text-amber-800 text-center pb-6">
            Reset Code
          </h2>
          <form onSubmit={formik.handleSubmit}>
            {apiError && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {apiError}
              </div>
            )}
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resetCode}
                type="text"
                name="resetCode"
                id="resetCode"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="resetCode"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your Reset Code
              </label>
            </div>
            {formik.errors.resetCode && formik.touched.resetCode && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {formik.errors.resetCode}
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="text-white bg-amber-800 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2 text-center"
              >
                Verify Code
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
