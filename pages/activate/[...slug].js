import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loading from "../../assets/images/loading.gif";
import Image from "next/legacy/image";
import { activateUser } from "../../services";
import { toastMsg } from "../../constants/toast-messages";
import { getStoredKey } from "../../utility/localStorage";

const Activate = () => {
  const router = useRouter();
  const [activateObj, setActivateObj] = useState({
    uid: "",
    token: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const [uid, token] = router.query.slug;
      setActivateObj({ uid, token });
    }
  }, [router.isReady]);

  const { uid, token } = activateObj;

  const handelActivate = () => {
    setIsLoading(true);

    activateUser({ uid, token })
      .then((response) => {
        toast.success(toastMsg.SUCCESS_SIGNUP, {
          toastId: "signup",
        });
        let username = getStoredKey("USERNAME")
        router.push({
          pathname: "/login",
          query: { username },
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
      <Head>
        <title>Activate account</title>
        <meta name="description" content={"Activate account"} />
      </Head>
      <div className="px-6 xl:px-20 md:px-10 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center ">
        <div className="mt-10 bg-white shadow-lg md:w-1/2 w-full lg:px-10 px-6 sm:py-10 py-6 rounded-tl-3xl rounded-br-3xl">
          <div className="flex flex-col items-center py-16">
            <h1 className="px-4 pt-8 pb-4 text-center text-2xl md:text-3xl font-bold leading-10 text-gray-800">
              Activate your account
            </h1>
            <p className="px-4 pb-10 text-sm md:text-base text-center text-gray-600 leading-6">
              👋 Welcome, You are going to love this forum...
            </p>
            <button
              role="button"
              className={`flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 w-[60%] ${
                !isLoading && "py-4"
              }`}
              onClick={handelActivate}
            >
              {isLoading ? (
                <Image height={42} width={40} src={Loading} alt="loading..." />
              ) : (
                "Activate"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activate;
