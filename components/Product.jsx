import React from "react";
import RotatingBorderComp from "./RotatingBorderComp";
import Link from "next/link";
import { githubFeatureList } from "../constants/misc";
import Image from "next/image";

const Product = () => {
  return (
    <div>
      <RotatingBorderComp>
        <div className="z-[2] absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
          Offer
        </div>
        <div className="relative z-[10]">
          <h2 className="text-yellow-400 font-bold my-3 text-lg sm:text-xl z-[10] mt-6 mb-6">
            GitHub Student Developer Pack
            <br />
          </h2>
          <div className="border-animation" />
          <div className=" rounded-lg">
            <div className="mx-auto mb-4 max-w-sm shadow rounded-lg border-4 border-indigo-700 bg-gray-300">
              <div className="pt-8 px-8 pb-6">
                <h2 className="text-xl text-center text-red-600 pb-3 font-bold">
                  Limited Qty Available : 20 <br></br> ( First come first serve
                  )
                </h2>
                <p className="text-sm">
                  Others will get refund if all accounts gets sold !
                </p>
              </div>
              <div className="pt-2 px-8 h-max">
                <ul className=" h-[25vh] overflow-y-auto">
                  {githubFeatureList.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="pl-1 py-2 flex items-start"
                    >
                      <div className="h-6 w-6 flex-none relative">
                        <Image
                          layout="fill"
                          alt={"features"}
                          className="rounded-full bg-green-tag text-center"
                          src="data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg'><text x='5' y='20' font-size='18px'>&#10004;</text></svg>"
                        />
                      </div>
                      <p className="pl-3 font-semibold">{feature.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center pb-8">
                <div>
                  <Link
                    className="w-full hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block hover:bg-pink-600 rounded-full text-white px-8 py-3 cursor-pointer"
                    href={`/developer-pack`}
                  >
                    What you will get ?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RotatingBorderComp>
    </div>
  );
};

export default Product;
