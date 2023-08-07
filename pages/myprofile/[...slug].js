import { toast } from "react-toastify";
import moment from "moment";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toastMsg } from "../../constants/toast-messages";
import { SMALL_ASSET_IMAGE } from "../../constants/urls";
import {
  getDownloadsBySlug,
  getMyPurchasedCourse,
  tellDownloadNotWorking,
} from "../../services";
import { getMeDownloadLinkAndRedirect } from "../../utility/functions";
import { clearStoredUser, getStoredUser } from "../../utility/localStorage";
import Loading from "../../assets/images/loading.gif";
import { ToolTip } from "../../components/Tooltip";
import { handleDownload } from "../post/[slug]";
import ResetPassword from "../../components/ResetPassword";

const getMeToast = (status, message) => {
  if (status == "Created") {
    toast.info(message);
  } else if (status == "AgainClick") {
    toast.dark(message);
  } else {
    toast.dark(message);
  }
};

const MyProfile = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [slug, setSlug] = useState("");

  const [resetObj, setResetObj] = useState({
    email: "",
  });

  const handleReportClick = (blogId) => {
    tellDownloadNotWorking(blogId)
      .then((response) => {
        if (response.data) {
          const { message, status } = response.data;
          getMeToast(status, message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      setSlug(router.query.slug[0]);
    }
  }, [router.isReady, router.query.slug]);

  useEffect(() => {
    async function fetchData() {
      if (slug == "dashboard") {
        setIsLoading(true);
        const { data } = await getMyPurchasedCourse();
        setCourses(data);
        setIsLoading(false);
      } else if (slug == "reset-password") {
        const user = getStoredUser();
        if (!user) {
          router.push("/");
        } else {
          setResetObj({ email: user.email });
        }
      }
    }
    fetchData();
  }, [slug]);

  const handelLogout = () => {
    clearStoredUser();
    toast.success(toastMsg.LOGGED_OUT, {
      toastId: "logout",
    });
    router.push("/");
  };

  async function handleDownloadBySlug(isTD, slug) {
    try {
      const response = await getDownloadsBySlug(slug);
      handleDownload(response?.data, isTD);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container mt-28 sm:mt-20 mx-auto px-4 sm:px-10 mb-8 relative">
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 break-words min-h-[90vh]">
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="rounded-xl">
            <div className="mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 ">
              {/* <button
                onClick={() => router.push("/myprofile/dashboard")}
                className={`focus:outline-none flex jusitfy-start hover:border-indigo-700 border border-transparent focus:border-indigo-700 focus:text-indigo-700 hover:text-indigo-700 text-gray-800 rounded py-3 pl-4 items-center space-x-6 w-full ${
                  slug == "dashboard" ? "border-indigo-700 text-indigo-700" : ""
                } `}
              >
                <svg
                  className="fill-stroke "
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-base leading-4 ">My Courses</p>
              </button> */}
              <button
                onClick={() => router.push("/myprofile/reset-password")}
                className={`focus:outline-none flex jusitfy-start hover:border-indigo-700 border border-transparent focus:border-indigo-700 focus:text-indigo-700 hover:text-indigo-700 text-gray-800 rounded py-3 pl-4 items-center space-x-6 w-full ${
                  slug == "reset-password"
                    ? "border-indigo-700 text-indigo-700"
                    : ""
                } `}
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 19C10.2091 19 12 17.2091 12 15C12 12.7909 10.2091 11 8 11C5.79086 11 4 12.7909 4 15C4 17.2091 5.79086 19 8 19Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.85 12.15L19 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 5L20 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 8L17 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-base leading-4  ">Reset Password</p>
              </button>
              <button
                onClick={handelLogout}
                className={`focus:outline-none flex jusitfy-start hover:border-indigo-700 border border-transparent focus:border-indigo-700 focus:text-indigo-700 hover:text-indigo-700 text-gray-800 rounded py-3 pl-4 items-center space-x-6 w-full `}
              >
                <svg
                  className="fill-stroke"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-base leading-4 ">Logout</p>
              </button>
            </div>
          </div>
          <div className="lg:col-span-3 rounded-xl">
            {slug == "dashboard" ? (
              <div className="relative overflow-hidden mb-2 md:mb-6 mx-6">
                {courses.length > 0 ? (
                  <>
                    <h1 className="mt-8 text-lg md:text-3xl text-center font-semibold">
                      Thanks for your contribution 😇
                    </h1>
                    <div className="overflow-y-scroll h-[70vh] flex flex-col items-center ">
                      {courses.map(({ course: post, created_at }, ind) => (
                        <div
                          key={ind}
                          className="mt-8 cursor-pointer shadow-sm bg-gray-100 p-6 rounded-2xl w-[80vw] sm:w-[90%] "
                        >
                          <div
                            key={post.title}
                            className="flex items-center w-[96%] mb-2 mx-auto"
                          >
                            <div className="h-16 w-16 flex-none relative">
                              <Image
                                layout="fill"
                                alt={post.title}
                                className="rounded-lg shadow-lg"
                                src={
                                  SMALL_ASSET_IMAGE +
                                  post.featuredImage.slice(-20)
                                }
                              />
                            </div>
                            <div className="flex-grow ml-4">
                              <p className="text-gray-500 text-xs sm:text-sm">
                                Contributed@{" "}
                                {moment(created_at).format("MMM DD, YYYY")}
                              </p>
                              <p className="hover:text-pink-500 break-word text-xs sm:text-[13px]">
                                {post.title}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div>
                              {post.downloads.length > 0 &&
                                post.downloads.map((download) => (
                                  <div
                                    className="inline-block sm:m-2"
                                    key={download.id}
                                  >
                                    <span
                                      onClick={() =>
                                        // getMeDownloadLinkAndRedirect(
                                        //   download.id
                                        // )
                                        handleDownloadBySlug(false, post.slug)
                                      }
                                      className="hover:shadow-xl hover:scale-95 hover:bg-gray-400 m-1  transition duration-150 text-xs sm:text-sm font-bold inline-block bg-green-tag rounded-full text-black px-4 py-2 sm:px-6 sm:py-2 cursor-pointer"
                                    >
                                      {download.title}
                                    </span>
                                  </div>
                                ))}
                            </div>
                            <div>
                              <ToolTip
                                tooltipText={`If download Link not working, then only click here 👇`}
                              >
                                <button
                                  type="button"
                                  title="Click if link not working"
                                  onClick={() => handleReportClick(post.id)}
                                  className={`flex items-center justify-center h-10 hover:shadow-xl hover:scale-95 hover:bg-indigo-700 m-1  transition duration-150 text-xs sm:text-base font-bold bg-red-600 rounded-full text-white px-4 py-2 sm:px-6 sm:py-2 cursor-pointer ${
                                    !isLoading && "px-4 py-2 sm:px-8 sm:py-3"
                                  }`}
                                >
                                  {isLoading ? (
                                    <Image
                                      height={40}
                                      width={40}
                                      src={Loading}
                                      alt="loading..."
                                    />
                                  ) : (
                                    <svg
                                      className="fill-stroke"
                                      width={24}
                                      height={24}
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  )}
                                </button>
                              </ToolTip>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : isLoading ? (
                  ""
                ) : (
                  <>
                    <h1 className="mt-8 text-lg md:text-3xl text-center font-semibold">
                      Sorry dude you don't have any Contribution 😞
                    </h1>
                    <ul className="my-4 text-center text-red-600">
                      <li>
                        Once you contribute for the course you will get direct
                        download link here..!!
                      </li>
                      <li>
                        Even if the Course has been taken down due to DMCA, You
                        will have Direct Access Link here..!!
                      </li>
                    </ul>
                  </>
                )}
              </div>
            ) : slug == "reset-password" ? (
              resetObj.email && (
                <ResetPassword
                  title={"Reset Password"}
                  resetObj={resetObj}
                  setResetObj={setResetObj}
                />
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
