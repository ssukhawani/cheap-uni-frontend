import React from "react";
import Link from "next/link";
import RequestAcceptedComp from "./RequestAccptedComp";

const CrossSell = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-4 mb-8 text-center relative cursor-pointer">
      <div className="absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
        Request
      </div>
      <h2 className="text-[#FF1E00] font-bold my-3 text-lg sm:text-xl">
        Request anything from...
        <br />
      </h2>

      <RequestAcceptedComp />

      <div>
        <Link
          className="w-full hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block hover:bg-pink-600 rounded-full text-white px-8 py-3 cursor-pointer"
          href={`/request`}
        >
          Get me one
        </Link>
      </div>
    </div>
  );
};

export default CrossSell;
