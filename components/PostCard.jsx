import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/legacy/image";
import postStyles from "./post-styles.module.css";

const isWorking = {
  W: "Working",
  E: "Expired",
  U: "Updated",
};

const PostCard = ({ post }) => {
  return (
    <div className=" shadow-2xl rounded-lg p-2 lg:p-4 pb-4 lg:pb-5 mb-8 relative bg-white border-t-4 border-black ">
      {post.blogLinkStatus && (
        <div
          className={`ribbon z-10 ${
            post.blogLinkStatus === "W"
              ? postStyles.ribbon
              : post.blogLinkStatus === "U"
              ? postStyles.ribbonYellow
              : postStyles.ribbonRed
          }`}
        >
          <span>{isWorking[post.blogLinkStatus]}</span>
        </div>
      )}
      <div className="relative overflow-hidden shadow-md pb-40 sm:pb-60 lg:pb-40 mb-3">
        <Image
          src={post.featuredImage}
          alt={post.title}
          layout="fill"
          priority
          className="object-top absolute h-40 sm:h-60 lg:h-40 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h1 className="transition duration-700 text-center sm:mb-4 cursor-pointer hover:text-pink-600 text-base sm:text-xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="flex text-center justify-center items-center mb-4 w-full">
        <div className="flex items-center justify-center lg:mb-0 lg:w-auto mr-4">
          <img
            src={post.author.photo}
            alt={post.author.name}
            className="align-middle rounded-full h-4 w-4 sm:h-6 sm:w-6"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-sm sm:text-base">
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-6 sm:w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="align-middle  text-sm sm:text-base">
            {moment(post.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>

      <p className="text-center text-gray-700 font-normal mb-4 text-sm">
        {post.excerpt.slice(0, 80)}...
      </p>
      <div className="text-center">
        <Link
          className="hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block hover:bg-pink-600 rounded-full text-white px-8 py-3 cursor-pointer"
          href={`/post/${post.slug}`}
        >
          Continue Reading...
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
