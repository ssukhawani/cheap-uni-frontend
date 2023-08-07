import { useRouter } from "next/router";
import React from "react";

const PromoteOnSidebar = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("promote/here")}
      className="bg-white rounded-lg shadow-lg p-4 sm:p-4 mb-8 text-center cursor-pointer relative"
    >
      <div className="absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
        Promoting
      </div>
      <h2 className="text-[#FF1E00] font-bold my-4 text-lg sm:text-xl">
        {" "}
        <br></br>
      </h2>
      <h3 className="text-black font-bold my-4 text-lg sm:text-xl">
        Contact us here to promote your Product/Brand
      </h3>
    </div>
  );
};

export default PromoteOnSidebar;
