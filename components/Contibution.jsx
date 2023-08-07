import { useRouter } from "next/router";
import React from "react";
import RotatingBorderComp from "./RotatingBorderComp";

const Contribution = () => {
  const router = useRouter();
  return (
    <RotatingBorderComp>
      <div className="z-[2] absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
        Contribution
      </div>
      <div className="z-[2] relative">
        <h2 className="text-white font-bold my-4 text-lg sm:text-2xl">
          {" "}
          If you are Loving{" "}
          <button className="text-lg active:scale-[0.7] transition duration-150">
            ❤️
          </button>{" "}
          <br /> our forum...
        </h2>
        <h4 className="text-yellow-400 font-bold text-sm mb-4">
          you can contribute...
        </h4>
        <div>
          <span
            onClick={() =>
              router.push("https://buy.stripe.com/00g28h0Ud7Qm0yA001")
            }
            className={`hover:shadow-xl hover:scale-95 hover:bg-pink-600 m-1 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block bg-indigo-700 rounded-full text-white px-4 py-2 sm:px-8 sm:py-2 cursor-pointer`}
          >
            Contribute (Card) 😀
          </span>
        </div>
      </div>
    </RotatingBorderComp>
  );
};

export default Contribution;
