import { toast } from "react-toastify";
import moment from "moment";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { toastMsg } from "../../constants/toast-messages";
import { clearStoredUser, getStoredUser } from "../../utility/localStorage";
import ResetPassword from "../../components/ResetPassword";
import UserProfile from "../../components/UserProfile";
import { membershipDetails } from "../../services";
import Smiley from "../../assets/images/smiley.gif";
import TakenDown from "../../components/TakenDown";

const MyProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [slug, setSlug] = useState("");

  const [resetObj, setResetObj] = useState({
    email: "",
  });

  useEffect(() => {
    if (router.isReady) {
      setSlug(router.query.slug[0]);
    }
  }, [router.isReady, router.query.slug]);

  useEffect(() => {
    async function fetchData() {
      const storedUser = getStoredUser();
      if (!storedUser) {
        router.push("/");
      } else {
        try {
          const response = await membershipDetails();
          const updatedData = response.data;
          setUser({ ...storedUser, ...updatedData });
          setResetObj({ email: storedUser.email });
        } catch (error) {
          console.error("Error fetching membership details:", error);
        }
      }
    }
    fetchData();
  }, [slug]);

  if (!user) {
    return (
      <div className="h-screen w-screen grid place-content-center">
        <Image height={100} width={100} src={Smiley} alt="loading..." />
      </div>
    );
  }

  const handelLogout = () => {
    clearStoredUser();
    toast.success(toastMsg.LOGGED_OUT, {
      toastId: "logout",
    });
    router.push("/");
  };

  return (
    <div className="container mt-28 sm:mt-20 mx-auto px-4 sm:px-10 mb-8 relative">
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 break-words min-h-[90vh]">
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="rounded-xl">
            <div className="mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 ">
              <button
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
                <p className="text-base leading-4 ">My Profile</p>
              </button>
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
                onClick={() => router.push("/myprofile/dmca-takendown")}
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
                <p className="text-base leading-4 ">DMCA TakenDown Courses</p>
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
          <div className="lg:col-span-3 rounded-xl inline-grid">
            {slug == "dashboard" ? (
              <div className="relative overflow-hidden mb-2 md:mb-6 mx-6">
                <UserProfile user={user} />
              </div>
            ) : slug == "dmca-takendown" ? (
              user && (
                <div className="relative overflow-hidden mb-2 md:mb-6 mx-6">
                  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h1 className="text-base md:text-2xl font-semibold mb-8">
                      Taken Down Courses {!(user.role == "P" || user.role == "A") && "For Premium Users Only"} ( We got you covered 🥷🏻)
                    </h1>
                    <TakenDown
                      isPremiumUser={user.role == "P" || user.role == "A"}
                    />
                  </div>
                </div>
              )
            ) : slug == "reset-password" ? (
              resetObj.email && (
                <div className="relative overflow-hidden mb-2 md:mb-6 mx-6">
                  <ResetPassword
                    title={"Reset Password"}
                    resetObj={resetObj}
                    setResetObj={setResetObj}
                  />
                </div>
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
