import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { getDownloadsBySlug, getTDBlogList } from "../services";
import { checkIsNoob } from "../utility/functions";
import { handleDownload } from "../pages/post/[slug]";

const TakenDown = ({ isPremiumUser = false }) => {
  const router = useRouter();
  const [takenDownList, setTakenDownList] = useState([]);

  useEffect(() => {
    getTDBlogList().then((res) => {
      if (res.length) {
        setTakenDownList(res);
      }
    });
  }, []);

  const isNoob = useCallback(() => checkIsNoob(), [router.asPath]);

  async function handleDownloadBySlug(isTD, slug) {
    try {
      const response = await getDownloadsBySlug(slug);
      handleDownload(response?.data, isTD);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {!isNoob() && (
        <div
          onClick={() => {}}
          className="bg-white rounded-lg shadow-lg p-4 sm:p-4 mb-8 text-center relative cursor-pointer"
        >
          <div className="absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
            Taken Down Resources
          </div>
          <div className={`mt-8 overflow-y-scroll h-[50vh] px-2`}>
            {takenDownList.map((post, ind) => (
              <div key={ind + post.slug}>
                <div className="flex items-center w-full mb-4">
                  <div className={`h-16 w-16 flex-none relative`}>
                    <Image
                      layout="fill"
                      alt={post.title}
                      className="rounded-full shadow-lg bg-black text-center"
                      src={`data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg'><text x='10' y='45' font-size='35px'>${
                        isPremiumUser ? "🤩" : "🖕"
                      }</text></svg>`}
                    />
                  </div>
                  <div className="flex-grow ml-4">
                    {isPremiumUser ? (
                      <span
                        className="hover:text-pink-500 break-word text-xs sm:text-[13px]"
                        onClick={() => handleDownloadBySlug(true, post.slug)}
                      >
                        {post.title}
                      </span>
                    ) : (
                      <Link
                        className="hover:text-pink-500 break-word text-xs sm:text-[13px]"
                        href={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TakenDown;
