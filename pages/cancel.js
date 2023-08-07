import { useRouter } from "next/router";
import React, { useEffect } from "react";
import sad from "../assets/sad-tear.json"
import Lottie from "react-lottie";

const Cancel = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push("/"), 5000);
    // eslint-disable-line
  }, []);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: sad,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  return (
    <div className="h-screen relative">
      <Lottie options={defaultOptions} height={400} width={300} />
    </div>
  );
};

export default Cancel;
