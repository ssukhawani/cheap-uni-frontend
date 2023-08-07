import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/legacy/image";

import { getBlogsByTagSlug, getPopularBlogs } from "../services";
import { queryKeys } from "../constants/query-keys";
import { queryClient } from "../react-query/queryClient";
import { useQuery } from "react-query";
import { SMALL_ASSET_IMAGE } from "../constants/urls";

const PostWidgets = ({ tags = [], slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  const giveMeSlicedData = (data) => {
    let filtered = data.filter((post) => post.slug !== slug);
    setRelatedPosts(filtered);
  };

  const { data: data2 } = useQuery(
    [queryKeys.BLOG_BY_TAGS, tags[tags.length - 1]],
    () => getBlogsByTagSlug(tags[tags.length - 1]),
    {
      staleTime: Infinity,
      enabled: Boolean(slug),
      onSuccess: (data) => {
        if (data) {
          giveMeSlicedData(data);
        }
      },
      select: (data) => data.results,
    }
  );

  const { data } = useQuery(
    [queryKeys.POPULAR_BLOGS, slug],
    () => getPopularBlogs(),
    {
      enabled: !Boolean(slug),
      onSuccess: (data) => {
        if (data) {
          setRelatedPosts(data);
        }
      },
      select: (data) => data.results,
    }
  );
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8">
      <h2 className="text-center text-sm sm:text-xl mb-4 sm:mb-8 font-semibold border-b border-blue-300 pb-4">
        {slug ? "Related Posts" : "Popular Posts"}
      </h2>
      {relatedPosts.map((post, ind) => (
        <div key={ind + post.slug}>
          <div key={post.title} className="flex items-center w-full mb-4">
            <div className="h-16 w-16 flex-none relative">
              <Image
                layout="fill"
                alt={post.title}
                className="rounded-lg shadow-lg"
                src={SMALL_ASSET_IMAGE + post.featuredImage.slice(-20)}
              />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 text-xs sm:text-sm">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </p>
              <Link
                className="hover:text-pink-500 break-word text-xs sm:text-[13px]"
                href={`/post/${post.slug}`}
              >
                {post.title}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidgets;

export const getStaticProps = async () => {
  await queryClient.prefetchQuery([queryKeys.POPULAR_BLOGS], () =>
    getPopularBlogs()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
