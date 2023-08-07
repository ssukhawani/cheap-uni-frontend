import React, { useState } from "react";
import { resetPassword } from "../services";
import { toast } from "react-toastify";
import Loading from "../assets/images/loading.gif";
import Image from "next/image";
import { toastMsg } from "../constants/toast-messages";

const ResetPassword = ({ title, resetObj, setResetObj }) => {
  const [isLoading, setIsLoading] = useState(false);


  const handelChange = (prop) => (event) => {
    const { value } = event.target;

    setResetObj({ [prop]: value });
  };

  const handelSendResetPassLink = () => {
    setIsLoading(true);

    resetPassword(resetObj)
      .then((response) => {
        toast.success(toastMsg.RESET_PASS_LINK_SENT, {
          toastId: "reset-pass",
        });
      })
      .catch((err) => {
        if (err && err.response) {
          if ("detail" in err?.response.data) {
            toast.error(err?.response?.data?.detail);
          }
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="px-6 xl:px-20 md:px-10 md:py-12 py-9 flex justify-center items-center">
        <div className="mt-10 bg-white shadow-lg md:w-1/2 w-full lg:px-10 px-6 sm:py-10 py-6 rounded-tl-3xl rounded-br-3xl">
          <p
            tabIndex={0}
            className="focus:outline-none sm:text-2xl font-extrabold leading-6 text-gray-800"
          >
            {title}
          </p>

          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />
            <hr className="w-full bg-gray-400" />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-gray-800"
            >
              {" "}
              Email{" "}
            </label>
            <input
              id="email"
              aria-labelledby="email"
              type="email"
              className={`bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2`}
              placeholder="e.g: johndoe@gmail.com"
              value={resetObj?.email}
              onChange={handelChange("email")}
              required
              disabled={title == "Reset Password"}
            />
          </div>

          <div className="mt-8">
            <button
              role="button"
              className={`flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 w-full ${
                !isLoading && "py-4"
              }`}
              onClick={handelSendResetPassLink}
            >
              {isLoading ? (
                <Image height={42} width={40} src={Loading} alt="loading..." />
              ) : (
                "Send verification link"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
