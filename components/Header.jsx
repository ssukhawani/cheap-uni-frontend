import React, { useState } from "react";
import Link from "next/link";

import { getPageList, getTagsList, handleCheckoutRedirect } from "../services";
import { queryKeys } from "../constants/query-keys";
import { useQuery } from "react-query";
import CategoriesIcon from "./icons/CategoriesIcon";
import CrossIcon from "./icons/CrossIcon";
import DownArrow from "./icons/DownArrow";
import HamburgerMenu from "./icons/HamburgerMenu";
import HomeIcon from "./icons/HomeIcon";
import LogoutIcon from "./icons/LogoutIcon";
import PagesIcon from "./icons/PagesIcon";
import ProfileIcon from "./icons/ProfileIcon";
// import UpIcon from "./icons/UpIcon";
import ClickAwayListener from "react-click-away-listener";
import {
  clearStoredUser,
  getCartItems,
  getStoredUser,
} from "../utility/localStorage";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { toastMsg } from "../constants/toast-messages";
import Cart from "./Cart";

const Header = ({ tags, pagesInit }) => {
  const router = useRouter();
  const [show, setShow] = useState(null);
  const [profile, setProfile] = useState(false);

  const [dropDownFlags, setDropDownFlags] = useState({
    page: false,
    category: false,
  });

  const { data: tagList } = useQuery([queryKeys.TAGS], () => getTagsList(), {
    initialData: tags,
    staleTime: Infinity,
    select: (data) => data.data,
  });

  const { data: pageList } = useQuery([queryKeys.PAGES], getPageList, {
    initialData: pagesInit,
    staleTime: Infinity,
  });

  const handelDropClick = (prop, flag) => {
    setDropDownFlags({
      page: false,
      category: false,
      [prop]: flag,
    });
  };

  const handleClickAway = (prop) => {
    if (prop === "ul") {
      setDropDownFlags({
        page: false,
        category: false,
      });
    } else if (prop === "profile") {
      setProfile(false);
    }
  };

  const handelLogout = () => {
    clearStoredUser();
    toast.success(toastMsg.LOGGED_OUT, {
      toastId: "logout",
    });
    router.push("/");
  };

  const { page, category } = dropDownFlags;

  const user = getStoredUser();

  const handleCheckout = async () => {
    const courseIds = getCartItems();
    const user = getStoredUser();
    if (!!user?.access) {
      if (courseIds.length > 0) {
        const {
          data: {
            session: { url },
          },
        } = await handleCheckoutRedirect({ courseIds });
        window.location.href = url;
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      {/* Code block starts */}
      <nav className="fixed top-0 inset-x-0 z-50 w-full mx-auto text-white bg-black bg-opacity-60 shadow xl:block hidden">
        <div className="justify-between container px-6 h-16 flex items-center lg:items-stretch mx-auto">
          <div className="flex items-center">
            <div className="mr-10 flex items-center">
              <h3 className="text-base font-bold tracking-normal leading-tight ml-3 hidden lg:block">
                <Link href="/">CheapUniverse</Link>
              </h3>
            </div>
            <ClickAwayListener onClickAway={() => handleClickAway("ul")}>
              <ul className="pr-34 xl:flex hidden items-center h-full">
                <li
                  className="cursor-pointer font-bold h-full flex items-center text-sm hover:text-yellow-400 mx-10 tracking-normal relative"
                  onClick={() => handelDropClick("page", !page)}
                >
                  {page && (
                    <ul className="bg-white shadow rounded py-1 w-48 left-0 mt-16 -ml-4 absolute  top-0 z-10">
                      {pageList &&
                        pageList.map(
                          (page) =>
                            page.slug !== "download" && (
                              <Link key={page.slug} href={`/${page.slug}`}>
                                <li className="cursor-pointer text-gray-600 text-sm leading-4 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 hover:font-bold">
                                  {page.title}
                                </li>
                              </Link>
                            )
                        )}
                    </ul>
                  )}
                  Pages
                  <span className="ml-2">
                    <DownArrow className="bg-gray-300 rounded-full p-1" />
                  </span>
                </li>
                <li
                  className="cursor-pointer font-bold h-full flex items-center text-sm  hover:text-yellow-400 tracking-normal relative"
                  onClick={() => handelDropClick("category", !category)}
                >
                  {category && (
                    <ul className="h-60 w-48 overflow-y-scroll bg-white shadow rounded py-1 left-0 mt-16 -ml-4 absolute  top-0 z-10">
                      {tagList &&
                        tagList.map((tag) => (
                          <Link key={tag.slug} href={`/tag/${tag.slug}`}>
                            <li className="cursor-pointer text-gray-600 text-sm leading-4 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 hover:font-bold">
                              {tag.label}
                            </li>
                          </Link>
                        ))}
                    </ul>
                  )}
                  Categories
                  <span className="ml-2">
                    <DownArrow />
                  </span>
                </li>
                {/* {Boolean(user?.access) && (
                  <li>
                    <Link
                      className="ml-4 cursor-pointer text-sm font-bold inline-block hover:bg-pink-600 rounded-lg text-white px-3 py-1 m-1 mx-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150"
                      key={"my-courses"}
                      href={`/myprofile/dashboard`}
                    >
                      My Courses
                    </Link>
                  </li>
                )} */}
              </ul>
            </ClickAwayListener>
          </div>
          <div className="h-full xl:flex hidden items-center justify-end">
            <div className="h-full flex items-center">
              {/* <div className="w-32 pr-16 h-full flex items-center justify-end border-r" /> */}
              {/* <Cart handleClick={() => handleCheckout(true)} /> */}
              <div className="w-full h-full flex">
                {!Boolean(user?.access) ? (
                  <Link href={`/login`}>
                    <span className="flex items-center hover:shadow-xl hover:scale-95 hover:bg-pink-600 m-3 px-8 py-2 rounded-2xl transition duration-150 text-xs sm:text-base font-bold bg-purple-700 text-white cursor-pointer">
                      Login
                    </span>
                  </Link>
                ) : (
                  <div
                    className="w-full flex items-center justify-end relative cursor-pointer"
                    onClick={() => setProfile(!profile)}
                  >
                    {profile && (
                      <ClickAwayListener
                        onClickAway={() => handleClickAway("profile")}
                      >
                        <ul className="z-10 w-52 border-r bg-white absolute rounded left-0 shadow mt-16 top-0 ">
                          <li
                            onClick={() => router.push("/myprofile/reset-password")}
                            className="p-2 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:bg-indigo-700 hover:text-white focus:text-indigo-700 focus:outline-none hover:font-bold"
                          >
                            <div className="flex items-center">
                              <ProfileIcon />
                              <span className="ml-2">My Profile</span>
                            </div>
                          </li>
                          <li
                            onClick={handelLogout}
                            className="p-2 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:bg-indigo-700 hover:text-white focus:outline-none flex items-center hover:font-bold"
                          >
                            <LogoutIcon />
                            <span className="ml-2">Logout</span>
                          </li>
                        </ul>
                      </ClickAwayListener>
                    )}
                    <div className="rounded-full font-bold h-10 w-10 object-cover bg-purple-700 flex items-center justify-center">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm ml-2 font-bold">{user?.username}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav>
        <div className="z-50 py-4 px-6 w-full flex xl:hidden justify-between items-center text-white bg-black bg-opacity-60 fixed top-0">
          <div className="flex items-center">
            <Link className="text-base md:text-base ml-1 font-bold" href="/">
              CheapUniverse
            </Link>
          </div>
          <div className="flex items-center">
            {Boolean(user?.access) && (
              <Link key={"my-courses"} href={`/myprofile/reset-password`}>
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
              </Link>
            )}
            {/* <Cart handleClick={() => handleCheckout()} /> */}
            <div id="menu" onClick={() => setShow(!show)}>
              {show ? "" : <HamburgerMenu />}
            </div>
          </div>
        </div>
        {/*Mobile responsive sidebar*/}
        <div
          className={
            show
              ? "w-full h-[85vh] absolute z-55 xl:hidden "
              : "   w-full h-full absolute z-55 xl:hidden transform -translate-x-full"
          }
        >
          <div
            className="opacity-0 w-full h-full"
            onClick={() => setShow(!show)}
          />
          <div className="w-64 z-[55] fixed overflow-y-auto top-0 text-white bg-black bg-opacity-60 shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
            <div className="px-6 h-full">
              <div className="flex flex-col justify-between h-full w-full">
                <div>
                  <div className="mt-[17px] flex w-full items-center justify-between">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center"></div>
                      <div id="cross" onClick={() => setShow(!show)}>
                        <CrossIcon />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="pt-8 active:text-yellow-400">
                      <div className="flex items-center">
                        <div className="w-6 h-6 md:w-8 md:h-8">
                          <HomeIcon />
                        </div>
                        <Link className="text-base md:text-base ml-3" href="/">
                          Home
                        </Link>
                      </div>
                    </div>
                    <div className="pt-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-6 h-6 md:w-8 md:h-8 active:text-yellow-400">
                            <PagesIcon />
                          </div>
                          <p className="active:text-yellow-400 xl:text-base text-base ml-3">
                            Pages
                          </p>
                        </div>
                        {/* {page ? (
                          <div
                            onClick={() => handelDropClick("page", false)}
                            className="bg-purple-600 rounded-full p-1 cursor-pointer"
                          >
                            <UpIcon width={12} height={12} />
                          </div>
                        ) : (
                          <div
                            onClick={() => handelDropClick("page", true)}
                            className="bg-purple-600 rounded-full p-1 cursor-pointer"
                          >
                            <DownArrow width={12} height={12} />
                          </div>
                        )} */}
                      </div>
                      {true && (
                        <div className="my-3">
                          {pageList &&
                            pageList.map((page) => (
                              <Link href={`/${page.slug}`} key={page.slug}>
                                <span className="cursor-pointer text-sm font-bold inline-block hover:bg-pink-600 rounded-lg text-white px-3 py-1 m-1 mx-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150">
                                  {page.title}
                                </span>
                              </Link>
                            ))}
                        </div>
                      )}
                    </div>
                    <div className="pt-8">
                      <div className="flex items-center justify-between cursor-pointer z-[55]">
                        <div className=" flex items-center">
                          <div className="w-6 h-6 md:w-8 md:h-8">
                            <CategoriesIcon />
                          </div>
                          <p className="xl:text-base text-base ml-3">
                            Categories
                          </p>
                        </div>
                      </div>
                      {true && (
                        <div className="my-3 flex flex-col ">
                          {tagList &&
                            tagList.map((tags) => (
                              <Link href={`/tag/${tags.slug}`} key={tags.slug}>
                                <span className="cursor-pointer text-sm font-bold inline-block hover:bg-pink-600 rounded-lg text-white px-3 py-1 m-1 mx-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150">
                                  {tags.label + " ( " + tags.blogs_count + " )"}
                                </span>
                              </Link>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full pt-4 ">
                  {Boolean(user?.access) && (
                    <div className="flex justify-center mb-4 w-full">
                      <div
                        onClick={handelLogout}
                        className="relative w-full flex items-center hover:shadow-xl hover:scale-95 hover:bg-indigo-700 m-4 px-6 py-3 rounded-2xl transition duration-150 text-sm sm:text-base font-bold bg-purple-700 text-white cursor-pointer"
                      >
                        <LogoutIcon />
                        <span className="ml-2 cursor-pointer">Logout</span>
                      </div>
                    </div>
                  )}
                  <div className="border-t border-gray-300">
                    {!Boolean(user?.access) ? (
                      <Link href={`/login`}>
                        <span className="flex items-center hover:shadow-xl hover:scale-95 hover:bg-indigo-700 m-4 px-6 py-3 rounded-2xl transition duration-150 text-sm sm:text-base font-bold bg-purple-700 text-white cursor-pointer">
                          Login
                        </span>
                      </Link>
                    ) : (
                      <div className="w-full flex items-center justify-between pt-1">
                        <div className="flex items-center">
                          <div className="rounded-full font-bold h-8 w-8 object-cover bg-purple-700 flex items-center justify-center">
                            {user?.username.charAt(0).toUpperCase()}
                          </div>
                          <p className="font-bold text-base leading-4 ml-2">
                            {user?.username}
                          </p>
                        </div>
                        <ul className="flex">
                          <li className="cursor-pointer text-gray-800 pt-5 pb-3">
                            <div className="w-6 h-6 md:w-8 md:h-8"></div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

export async function getStaticProps() {
  const tags = await getTagsList();
  const pages = await getPageList();
  return {
    props: {
      tags: tags.data,
      pagesInit: pages,
    },
  };
}
