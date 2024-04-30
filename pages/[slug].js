import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageDetail, Categories, PostWidgets, Loader } from "../components";
import { queryKeys } from "../constants/query-keys";
import { getDownloadsById, getPageDetail } from "../services";
import { queryClient } from "../react-query/queryClient";
import { dehydrate, useQuery } from "react-query";
import { AdsContainer } from "../components/AdsContainer";
import DigitalOcean from "../components/DigitalOcean";
import PromoteOnSidebar from "../components/PromoteOnSidebar";
const pagePaths = [
  "/about",
  "/terms-and-conditions",
  "/privacy-policy",
  "/disclaimer",
  "/sitemap.xml",
  "/download",
  "/login",
];

const pageRoutes = [
  "about",
  "terms-and-conditions",
  "privacy-policy",
  "disclaimer",
  "download",
];

const PageDetails = () => {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("");

  const {
    query: { name, id, slug },
  } = router;

  useEffect(() => {
    if (!!id) {
      getDownloadsById(id).then((res) => {
        setRedirectUrl(res?.data.url);
      });
    }
  }, [router.query.id]);

  if (router.isFallback) {
    return <Loader />;
  }

  if (!pagePaths.includes(router.asPath)) {
    //This is handled in interceptor ( 404 )
  } else {
    if (slug === "sitemap.xml") {
      router.reload();
    }
  }

  const { data: page } = useQuery(
    [queryKeys.PAGE_DETAILS, slug],
    () => getPageDetail(slug),
    {
      staleTime: Infinity,
      enabled: slug !== "sitemap.xml" || slug !== "login",
    }
  );

  return (
    <>
      <div className="container mt-28 mx-auto px-4 sm:px-10 mb-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8 overflow-hidden">
            {page && (
              <PageDetail
                page={page}
                url={redirectUrl}
                slug={slug}
                pageRoutes={pageRoutes}
              />
            )}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              {/* <PromoteOnSidebar /> */}
              <DigitalOcean />
              <PostWidgets />
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

export default PageDetails;

export const getStaticProps = async (context) => {
  const slug = context.params?.slug;

  await queryClient.prefetchQuery(
    [queryKeys.PAGE_DETAILS, slug, { enabled: slug !== "sitemap.xml" }],
    () => getPageDetail(slug)
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
