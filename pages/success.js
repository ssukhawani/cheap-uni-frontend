import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import confetti from "../assets/confetti.json";
import success from "../assets/success.json";
import { clearCartItems } from "../utility/localStorage";
import Timer from "../components/Timer";

const Success = () => {
  const router = useRouter();
  const [isComingFromPaypal, setIsComingFromPaypal] = useState(false);
  
  useEffect(() => {
    if (router.isReady) {
      const PayerID = router.query.PayerID ?? null;
      const token = router.query.token ?? null;

      clearCartItems();
      if (PayerID && token) {
        setIsComingFromPaypal(true);
      }
    }
  }, [router.isReady]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: confetti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onFinish = () => {
    router.push("/myprofile/dashboard");
  };

  return (
    <div className="container mt-28 sm:mt-20 sm:w-[50vw] mx-auto">
      <div className="relative">
        <Lottie options={defaultOptions} width={400} height={400} />
        <div className="absolute top-0">
          <Lottie options={defaultOptions2} height={400} width={400} />
          <div className="bg-white shadow-lg lg:px-10 px-8 sm:py-10 py-6 rounded-tl-3xl rounded-br-3xl text-center">
            <p className="text-md font-semibold mb-2 text-center">
              Wait for few seconds, sometimes transaction takes time... <br />
              {isComingFromPaypal && (
                <Timer
                  seconds={isComingFromPaypal ? 25 : 10}
                  onFinish={onFinish}
                />
              )}{" "}
              seconds
            </p>
            {isComingFromPaypal && (
              <p className="mt-5 font-bold text-red-500">
                Note: Membership activation might take a few minutes...(We are
                fetching Transaction Status from the Payment gateway)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
