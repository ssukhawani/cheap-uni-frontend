import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loading from "../../assets/images/loading.gif";
import Image from "next/image";
import { resetPasswordConfirm } from "../../services";
import { toastMsg } from "../../constants/toast-messages";
import { clearStoredUser } from "../../utility/localStorage";
import EyeShow from "../../components/icons/EyeShow";
import EyeHide from "../../components/icons/EyeHide";

const PasswordReset = () => {
  const router = useRouter();
  const [resetPassObj, setResetPassObj] = useState({
    uid: "",
    token: "",
    new_password: "",
    re_new_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showpass, setShowPass] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const [uid, token] = router.query.slug;
      setResetPassObj({ ...resetPassObj, uid, token });
    }
  }, [router.isReady]);

  const handelChange = (prop) => (event) => {
    const { value } = event.target;

    setResetPassObj({ ...resetPassObj, [prop]: value });
  };

  const handelReset = () => {
    setIsLoading(true);

    resetPasswordConfirm(resetPassObj)
      .then((response) => {
        toast.success(toastMsg.PASSWORD_RESET_DONE, {
          toastId: "reset-pass-success",
        });
        clearStoredUser();
        router.push({
          pathname: "/login",
        });
      })
      .catch((err) => {
        if (err && err.response) {
          Object.entries(err.response.data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((error) => {
                toast.error(error, {
                  toastId: key,
                });
              });
            } else {
              if (key === "detail") {
                toast.error(value, {
                  toastId: key,
                });
              }
            }
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content={"Reset password"} />
      </Head>
      <div className="px-6 xl:px-20 md:px-10 py-6 2xl:mx-auto 2xl:container md:flex items-center justify-center ">
        <div className="mt-10 bg-white shadow-lg md:w-1/2 w-full lg:px-6 px-6 sm:py-10 py-4 rounded-tl-3xl rounded-br-3xl">
          <div className="flex flex-col items-center py-10">
            <h1 className="px-4 pt-4 pb-4 text-center text-2xl md:text-3xl font-bold leading-10 text-gray-800">
              Reset password
            </h1>
            <p className="px-4 pb-4 text-sm md:text-base text-center text-gray-600 leading-6">
              You need to login again after password reset ...
            </p>

            <div className="sm:mt-6 w-[80%] md:w-[60%]">
              <label
                htmlFor="new_password"
                className="text-sm font-medium leading-none text-gray-800"
              >
                {" "}
                Password{" "}
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  id="new_password"
                  type={showpass ? "text" : "password"}
                  className={`bg-gray-200 border rounded text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2`}
                  onChange={handelChange("new_password")}
                  required
                />
                <div
                  onClick={() => setShowPass(!showpass)}
                  className="absolute right-0 mt-2 mr-3 cursor-pointer"
                >
                  <div id="show">
                    <EyeShow />
                  </div>
                  <div id="hide" className="hidden">
                    <EyeHide />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 sm:mt-6 w-[80%] md:w-[60%] mb-10">
              <label
                htmlFor="re_new_password"
                className="text-sm font-medium leading-none text-gray-800"
              >
                {" "}
                Confirm Password{" "}
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  id="re_new_password"
                  type={showpass ? "text" : "password"}
                  className={`bg-gray-200 border rounded text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2`}
                  onChange={handelChange("re_new_password")}
                  required
                />
                <div
                  onClick={() => setShowPass(!showpass)}
                  className="absolute right-0 mt-2 mr-3 cursor-pointer"
                >
                  <div id="show">
                    <EyeShow />
                  </div>
                  <div id="hide" className="hidden">
                    <EyeHide />
                  </div>
                </div>
              </div>
            </div>

            <button
              role="button"
              className={`flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 w-[60%] ${
                !isLoading && "py-4"
              }`}
              onClick={handelReset}
            >
              {isLoading ? (
                <Image height={42} width={40} src={Loading} alt="loading..." />
              ) : (
                "Reset password"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
