import React, { useState } from "react";
import { useRouter } from "next/router";

import { getBlogsByTagSlug } from "../../services";
import { PostCard, Categories, Loader } from "../../components";
import { dehydrate, useQuery } from "react-query";
import { queryClient } from "../../react-query/queryClient";
import { queryKeys } from "../../constants/query-keys";
import { handelPagination } from "../../utility/functions";
import { AdsContainer } from "../../components/AdsContainer";

const CategoryPost = ({ posts }) => {
  const router = useRouter();
  const slug = router.query?.slug;

  const [pageNumber, setPageNumber] = useState("1");

  if (router.isFallback) {
    return <Loader />;
  }

  const { isSuccess, data, isLoading, isError } = useQuery(
    [queryKeys.BLOG_BY_TAGS, slug, pageNumber],
    () => getBlogsByTagSlug(slug, pageNumber),
    {
      initialData: posts,
      enabled: slug.length > 0,
      staleTime: Infinity,
    }
  );

  return (
    <>
      <div className="container mt-28 mx-auto px-4 sm:px-10 mb-8 relative ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1 grid grid-cols-1 lg:grid-cols-2 sm:gap-5 grid-flow-row auto-rows-max relative pb-12">
            {data &&
              data?.results &&
              data.results?.map((post, index) => {
                return (
                  <div eyk={index + post.slug}>
                    <PostCard key={index} post={post} />
                    <div className="rounded-lg">
                      <AdsContainer
                        client={"ca-pub-2093009960356176"}
                        slot={"9894549506"}
                        adFormat={"fluid"}
                        data-ad-layout-key="-6i+cz+4x-i-7k"
                        style={{ display: "block" }}
                      />
                    </div>
                  </div>
                );
              })}
            {data && data?.results && data?.results?.length && (
              <div className="-my-4 flex justify-content absolute bottom-0 left-1/2  transform -translate-x-1/2 ">
                <button
                  areal-label="Previous"
                  disabled={!Boolean(data?.previous)}
                  onClick={() =>
                    handelPagination(data?.previous, setPageNumber)
                  }
                  className="hover:ring-2 hover:ring-offset-1 font-semibold focus:ring-white focus:ring-2 focus:ring-offset-1 hover:ring-white focus:bg-black focus:outline-none hover:scale-95  w-full sm:w-auto bg-black transition duration-150 ease-in-out  rounded text-white px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black"
                >
                  Previous
                </button>
                <button
                  areal-label="Next"
                  disabled={!Boolean(data?.next)}
                  onClick={() => handelPagination(data?.next, setPageNumber)}
                  className="hover:ring-2 hover:ring-offset-1 font-semibold hover:ring-white focus:ring-white focus:ring-2 focus:ring-offset-1 focus:bg-black focus:outline-none hover:scale-95  w-full sm:w-auto bg-black transition duration-150 ease-in-out rounded text-white px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black"
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <div className="rounded-lg my-4">
                <AdsContainer
                  client={"ca-pub-2093009960356176"}
                  slot={"7095168689"}
                  adFormat={"auto"}
                  data-full-width-responsive="true"
                  style={{ display: "block" }}
                />
              </div>
              <Categories />
            </div>
          </div>
        </div>
        <div className="rounded-lg my-4">
          <AdsContainer
            client={"ca-pub-2093009960356176"}
            slot={"6341267557"}
            adFormat={"autorelaxed"}
          />
        </div>
      </div>
    </>
  );
};
export default CategoryPost;

// Fetch data at build time
export const getStaticProps = async (context) => {
  const slug = context.params?.slug;

  await queryClient.prefetchQuery([queryKeys.BLOG_DETAILS, slug], () =>
    getBlogsByTagSlug(slug, "1")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
