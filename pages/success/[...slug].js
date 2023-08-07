import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Lottie from "react-lottie";
import confetti from "../../assets/confetti.json";
import success from "../../assets/success.json";
import { clearCartItems } from "../../utility/localStorage";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setTimeout(() => {
        if (router.query.slug[0] == "purchase") {
          router.push("/");
        } else {
          clearCartItems();
          router.push("/myprofile/dashboard");
        }
      }, 5000);
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

  return (
    <div className="h-screen relative">
      <Lottie options={defaultOptions} height={800} width={600} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Lottie options={defaultOptions2} height={300} width={300} />
      </div>
    </div>
  );
};

export default Success;
