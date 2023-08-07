import { toast } from "react-toastify";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { errors } from "../constants/errors";
import { giveMeErrorFor } from "../pages/signup";
import {
  getAllBlogRequest,
  getDecisionList,
  submitCourseRequest,
  upvote,
} from "../services";
import { handelPagination } from "../utility/functions";
import Loading from "../assets/images/loading.gif";
import { getStoredUser } from "../utility/localStorage";
import { toastMsg } from "../constants/toast-messages";
import RequestAcceptedComp from "./RequestAccptedComp";

const helperObj = {
  name: "Name",
  url: "Url",
};

const RequestComponent = () => {
  const [allBlogRequest, setAllBlogRequest] = useState([]);
  const [pageNumber, setPageNumber] = useState("1");
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [decisionLists, setDecisionLists] = useState([]);

  const [courseDetails, setCourseDetails] = useState({
    name: "",
    url: "",
  });
  const [inputErrors, setInputErrors] = useState({
    nameError: "",
    urlError: "",
  });

  const { name, url } = courseDetails;
  const { nameError, urlError } = inputErrors;

  useEffect(() => {
    getAllBlogRequest(pageNumber).then((res) => {
      if (res) {
        setAllBlogRequest(res);
      }
    });
  }, [pageNumber, refetch]);

  useEffect(() => {
    getDecisionList().then((res) => {
      if (res.length) {
        const list = res.map((data) => String(data.number));
        setDecisionLists(list);
      } else {
        setDecisionLists([]);
      }
    });
  }, []);

  const handelUpvote = (Id) => {
    const user = getStoredUser();
    if (!!user?.access) {
      upvote(Id)
        .then((response) => {
          setRefetch(!refetch);
          toast.success(response?.data?.success);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        });
    } else {
      toast.error(toastMsg.LOGIN_FOR_UPVOTE, {
        toastId: "loginForUpvote",
      });
    }
  };

  const handelChange = (prop) => (event) => {
    const { value } = event.target;
    if (value === "") {
      inputErrors[`${prop}Error`] = `${helperObj[prop]} ${errors.EMPTY_INPUT}`;
    } else {
      inputErrors[`${prop}Error`] = "";
    }
    setCourseDetails({ ...courseDetails, [prop]: value });
    setInputErrors({ ...inputErrors });
  };

  const handelSubmit = () => {
    const user = getStoredUser();
    if (!!user?.access) {
      if (decisionLists.includes("6")) {
        handelSubmitRequest();
      } else {
        toast.error("We have stopped taking new request, will be back soon...");
      }
    } else {
      toast.error(toastMsg.LOGIN_FOR_REQUEST, {
        toastId: "loginForRequest",
      });
    }
  };

  const handelSubmitRequest = () => {
    let courseDetailErrors = [];
    setIsLoading(true);
    Object.entries(courseDetails).forEach(([key, value]) => {
      if (!Boolean(value)) {
        courseDetailErrors.push(key);
      }
    });

    if (courseDetailErrors.length) {
      courseDetailErrors.forEach((key) => {
        inputErrors[`${key}Error`] = `${helperObj[key]} ${errors.INVALID}`;
      });
      setInputErrors({ ...inputErrors });
      setIsLoading(false);
    } else {
      submitCourseRequest(courseDetails)
        .then((response) => {
          setRefetch(!refetch);
          if (response.status == 201) {
            toast.success("Request created successfully..!!");
          }
        })
        .catch((err) => {
          console.error(err);
          if (err?.response.status == 400) {
            toast.error(err?.response?.data[0]);
          }
        })
        .finally(() => setIsLoading(false));
      setCourseDetails({
        name: "",
        url: "",
      });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="bg-white shadow-lg rounded-lg lg:p-84 mb-8 break-words text-center">
        <div className="px-10 py-6">
          <h1 className="text-black font-bold text-base sm:text-xl mb-2">
            Request anything from...
          </h1>

          <RequestAcceptedComp />

          <div>
            <div>
              <input
                id="name"
                aria-labelledby="name"
                type="text"
                className={`${
                  !!nameError && "border-solid border-1 border-red-600"
                } bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2`}
                placeholder="Name (Course Name.. or Request title..)"
                value={name}
                onChange={handelChange("name")}
                required
              />
              <div className="text-left">{giveMeErrorFor(nameError)}</div>
            </div>
            <div>
              <input
                id="url"
                aria-labelledby="url"
                type="text"
                className={`${
                  !!urlError && "border-solid border-1 border-red-600"
                } bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2`}
                placeholder="URL"
                value={url}
                onChange={handelChange("url")}
                required
              />
              <div className="text-left">{giveMeErrorFor(urlError)}</div>
            </div>
            <div className="mt-6">
              <button
                role="button"
                className={`focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded-lg hover:bg-indigo-600 w-[60%] ${
                  !isLoading && "py-4"
                }`}
                onClick={handelSubmit}
              >
                {isLoading ? (
                  <Image
                    height={42}
                    width={40}
                    src={Loading}
                    alt="loading..."
                  />
                ) : (
                  "Submit request"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="sm:mt-10 text-black"></div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-4 mb-8 text-center relative cursor-pointer min-h-[100vh]">
        <div className="absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
          More likes faster RIP
        </div>
        <h1 className="text-[#FF1E00] font-bold my-2 mt-4 text-base sm:text-xl">
          Most liked request will be ripped faster
        </h1>
        <h3 className="text-black font-bold my-2 mt-4 text-sm sm:text-base">
          Note (Udemy Request): Only good quality courses will be added
        </h3>
        <div className="mt-8 overflow-y-scroll h-full px-2 pb-10">
          {allBlogRequest?.results?.map((post, ind) => (
            <div
              key={ind + post.createdAt}
              className={`m-2 rounded-lg shadow-md min-h-[70px] ${
                ind === 0 && pageNumber == 1 ? "winner__one" : ""
              }`}
            >
              <div className="flex justify-between mb-4 p-2">
                <div className="flex-[0.7] ">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-500 break-word text-xs sm:text-[16px]"
                    href={`${post.url}`}
                  >
                    {post.name}
                  </Link>
                </div>
                <div className="flex-[0.25] sm:flex-[0.2] md:flex-[0.12] flex gap-2 items-center">
                  <button
                    onClick={() => handelUpvote(post.id)}
                    className="text-lg active:scale-[0.7] transition duration-150"
                  >
                    ❤️
                  </button>
                  <div className=" hover:shadow-lg bg-gray-300 active:scale-90 transition duration-150 text-xs inline-block hover:bg-black hover:text-white font-bold rounded-lg text-black cursor-pointer px-3 py-1">
                    {post.upvote_count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex absolute bottom-1 left-1/2  transform -translate-x-1/2">
          <button
            areal-label="Previous"
            disabled={!Boolean(allBlogRequest?.previous)}
            onClick={() =>
              handelPagination(allBlogRequest?.previous, setPageNumber, false)
            }
            className="hover:ring-2 hover:ring-offset-1 font-semibold focus:ring-white focus:ring-2 focus:ring-offset-1 hover:ring-white focus:bg-black focus:outline-none hover:scale-95  w-full sm:w-auto bg-black transition duration-150 ease-in-out  rounded text-white px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black"
          >
            Previous
          </button>
          <button
            areal-label="Next"
            disabled={!Boolean(allBlogRequest?.next)}
            onClick={() =>
              handelPagination(allBlogRequest?.next, setPageNumber, false)
            }
            className="hover:ring-2 hover:ring-offset-1 font-semibold hover:ring-white focus:ring-white focus:ring-2 focus:ring-offset-1 focus:bg-black focus:outline-none hover:scale-95  w-full sm:w-auto bg-black transition duration-150 ease-in-out rounded text-white px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestComponent;
