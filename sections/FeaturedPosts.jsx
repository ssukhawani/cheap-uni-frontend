import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "react-query";

import { FeaturedPostCard } from "../components";
import { queryKeys } from "../constants/query-keys";
import { getFeaturedBlogList } from "../services";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1024, min: 850 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 850, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts = ({ featuredPosts }) => {
  const { data } = useQuery(
    [queryKeys.FEATURED_BLOGS],
    () => getFeaturedBlogList(),
    {
      initialData: featuredPosts,
      staleTime: Infinity,
      select: (data) => data.results,
    }
  );

  const customLeftArrow = (
    <div className="absolute arrow-btn left-0 text-center mt-10 py-2 sm:py-3 cursor-pointer bg-pink-600 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6  text-white w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </div>
  );

  const customRightArrow = (
    <div className="absolute arrow-btn right-0 text-center mt-10 py-2 sm:py-3 cursor-pointer bg-pink-600 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 text-white w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </div>
  );

  return (
    <div className="mb-8">
      {data && data.length > 0 && (
        <Carousel
          infinite
          autoPlay
          pauseOnHover
          customLeftArrow={customLeftArrow}
          customRightArrow={customRightArrow}
          responsive={responsive}
          itemClass="px-4"
        >
          {data &&
            data.map((post, index) => (
              <FeaturedPostCard key={index} post={post} />
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default FeaturedPosts;

export async function getStaticProps() {
  const featuredPosts = await getFeaturedBlogList();
  return {
    props: {
      featuredPosts: featuredPosts,
    },
  };
}
