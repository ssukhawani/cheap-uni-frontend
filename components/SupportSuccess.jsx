import React from "react";
import Timer from "./Timer";

export default function SupportSuccess({ setFlag, onFinish }) {
  return (
    <div className="min-h-screen">
      {/* <h1 className="font-bold text-center p-4 text-xl">
        Sorry Dude 😐 <br/>
        We are working on Some new <br/>
        features Will be back in few days... <br/>
        We'll appreciate your support ❤️ 
      </h1> */}
      <div className="flex items-center justify-center py-8 px-6">
        <div className="relative md:w-96 rounded shadow-lg pt-8 pb-6 px-8 dark:bg-gray-800 bg-white">
          <div className="flex  flex-col justify-center items-center w-full">
            <img src="https://i.ibb.co/d40yzK2/White-in-Jacket10.png" />
            <div className="mt-6 flex flex-col items-center justify-center">
              <p className="text-lg font-bold leading-none text-gray-800 dark:text-gray-50 text-center">
                We appreciate your support ❤️
              </p>
              <p className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 mt-3">
                Education should be Valuable than Expensive 😇
              </p>
            </div>
          </div>
          <div className="border rounded-lg border-gray-200 dark:border-gray-900 dark:bg-gray-900 bg-white pt-2 px-2 pb-8 mt-4 mb-6">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-normal text-center">
              You will get your links <br /> in{" "}
              <Timer seconds={20} onFinish={onFinish} /> seconds
            </p>
          </div>
          <div
            onClick={() => setFlag(false)}
            className="cursor-pointer absolute top-0 right-0 m-3 dark:text-gray-100  text-gray-600 transition duration-150 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Close"
              className="icon icon-tabler icon-tabler-x"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
