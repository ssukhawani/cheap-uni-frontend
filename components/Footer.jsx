import React from "react";
import Link from "next/link";
import { FeaturedPosts } from "../sections";
import { useRouter } from "next/router";
import { getPageList } from "../services";
import { useQuery } from "react-query";
import { queryKeys } from "../constants/query-keys";

const Footer = ({ pages }) => {
  const router = useRouter();

  const { data } = useQuery([queryKeys.PAGES], getPageList, {
    initialData: pages,
    staleTime: Infinity,
  });

  return (
    <div className="pt-16">
      <div className="w-full bg-black bg-opacity-60 py-12 h-fit ">
        {router.query.slug && <FeaturedPosts />}
        <div className="container mx-auto xl:flex text-center xl:text-left lg:text-left">
          <div className="xl:w-3/6 sm:w-full lg:w-full text-center xl:text-left mb-6 xl:mb-0 text-sm md:text-base">
            <p className="text-white sm:text-center lg:text-center xl:text-left">
              &copy; 2023 CheapUniverse. All Rights Reserved
            </p>
          </div>
          <div className="xl:w-3/4 sm:w-full">
            <ul className="flex justify-around flex-wrap">
              {data &&
                data.length > 0 &&
                data.map(
                  (page) =>
                    page.slug !== "download" && (
                      <li
                        className="text-white mb-3 sm:mb-0"
                        key={page.title}
                      >
                        <Link href={`/${page.slug}`} area-label={page.title}>
                          <span className="cursor-pointer text-sm text-white md:float-right mt-2 ml-2 font-semibold hover:text-pink-500">
                            {page.title}
                          </span>
                        </Link>
                      </li>
                    )
                )}

              <li className="text-white mb-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0">
                <Link href={"/sitemap.xml"}>
                  <span className="cursor-pointer text-sm text-white md:float-right mt-2 ml-4 font-semibold hover:text-pink-500">
                    Sitemap
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

export async function getStaticProps() {
  const pages = await getPageList();
  return {
    props: {
      pages: pages,
    },
  };
}
