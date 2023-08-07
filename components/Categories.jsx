import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getTagsList } from "../services";
import { queryKeys } from "../constants/query-keys";
import { useQuery } from "react-query";

const Categories = ({ tags }) => {
  const {
    data: tagList,
    error,
    isError,
    isLoading,
  } = useQuery([queryKeys.TAGS], () => getTagsList(), {
    initialData: tags,
    staleTime: Infinity,
    select: (data) => data.data,
  });

  return (
    <div className="bg-white rounded-lg shadow-lg text-center p-4 sm:p-8 mb-8 pb-12 text-sm sm:text-base">
      <h3 className="text-center text-sm sm:text-xl mb-4 sm:mb-8 font-semibold border-b border-blue-300 pb-4">
        Tags
      </h3>
      {tagList &&
        tagList.map((tags) => (
          <Link
            className="cursor-pointer text-sm font-bold inline-block hover:bg-pink-600 rounded-lg text-white px-3 py-1 m-1 mx-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150"
            key={tags.slug}
            href={`/tag/${tags.slug}`}
          >
            {tags.label + " ( " + tags.blogs_count + " )"}
          </Link>
        ))}
    </div>
  );
};

export async function getStaticProps() {
  const tags = await getTagsList();
  return {
    props: {
      tags: tags.data,
    },
  };
}

export default Categories;
