import Image from "next/legacy/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllFulfilledRequest } from "../services";
import { handelPagination } from "../utility/functions";

const Fulfilled = () => {
  const [allFulfilledRequest, setAllFulfilledRequest] = useState([]);
  const [pageNumber, setPageNumber] = useState("1");

  useEffect(() => {
    getAllFulfilledRequest(pageNumber).then((res) => {
      if (res) {
        setAllFulfilledRequest(res);
      }
    });
  }, [pageNumber]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-4 mb-8 text-center relative cursor-pointer min-h-[80vh]">
        <div className="absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
          Fulfilled Request
        </div>
        <div className="mt-8 overflow-y-scroll h-[65vh] px-2">
          {allFulfilledRequest?.results?.map((post, ind) => (
            <div key={ind + post.createdAt}>
              <div className="flex items-center w-full mb-4">
                <div className="h-10 w-10 flex-none relative">
                  <Image
                    layout="fill"
                    alt={post.name}
                    className="rounded-full bg-green-tag text-center"
                    src="data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg'><text x='10' y='30' font-size='25px'>&#10004;</text></svg>"
                  />
                </div>
                <div className="flex-grow ml-4">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-500 break-word text-xs sm:text-[13px]"
                    href={`${post.blogLink}`}
                  >
                    {post.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex absolute bottom-1 left-1/2  transform -translate-x-1/2">
          <button
            areal-label="Previous"
            disabled={!Boolean(allFulfilledRequest?.previous)}
            onClick={() =>
              handelPagination(
                allFulfilledRequest?.previous,
                setPageNumber,
                false
              )
            }
            className="hover:ring-2 hover:ring-offset-1 font-semibold focus:ring-white focus:ring-2 focus:ring-offset-1 hover:ring-white focus:bg-black focus:outline-none hover:scale-95  w-full sm:w-auto bg-black transition duration-150 ease-in-out  rounded text-white px-4 py-1 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black"
          >
            Previous
          </button>
          <button
            areal-label="Next"
            disabled={!Boolean(allFulfilledRequest?.next)}
            onClick={() =>
              handelPagination(allFulfilledRequest?.next, setPageNumber, false)
            }
            className="hover:ring-2 hover:ring-offset-1 font-semibold hover:ring-white focus:ring-white focus:ring-2 focus:ring-offset-1 focus:bg-black focus:outline-none hover:scale-95  w-full sm:w-auto bg-black transition duration-150 ease-in-out rounded text-white px-4 py-1 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Fulfilled;
