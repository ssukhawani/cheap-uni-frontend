import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import postStyles from "./post-styles.module.css";
import Head from "next/head";
import { Modal } from "react-responsive-modal";
import SupportSuccess from "./SupportSuccess";
import { AdsContainer } from "./AdsContainer";
import { useRouter } from "next/router";
import Link from "next/link";
import CrossSellHorizontal from "./CrossSellHorizontal";

export const getMeRandomNum = () => Math.floor(Math.random() * 4);

const PostDetail = ({ post, decisionLists, handleDownloadBySlug, user }) => {
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const [initialTimerFlag, setInitialTimerFlag] = useState(false);
  const [decisionNo, setDecisionNo] = useState("");
  const initialRenderRef = useRef(true);


  useEffect(() => {
    if (initialRenderRef.current) {
      setInitialTimerFlag(true);
    }
    initialRenderRef.current = false;
  }, []);

  const onFinish = (when) => {
    if (when === "initial") {
      setDecisionNo(`${getMeRandomNum()}`);
      setShowDownload(true);
    } else {
      setFlag(false);
      if (!!redirectUrl) {
        // window.open(atob(redirectUrl));
        handleDownloadBySlug(false);
      }
    }
  };

  const siteUrl = process.env.SITE_URL || "https://www.cheapuniverse.org/";

  // const handelAddToCart = () => {
  //   const cart = getCartItems();
  //   if (!cart?.includes(post.id)) {
  //     setCartItems(post.id);
  //     toast.info("Course added to the cart");
  //   } else {
  //     toast.warning("Course already added in the cart");
  //   }
  // };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt.slice(0, 250)} />
        <meta name="url" content={siteUrl + "post/" + post.slug} />

        <meta
          property="og:url"
          content={siteUrl + "post/" + post.slug}
          key="ogurl"
        />
        <meta property="og:image" content={post.featuredImage} key="ogimage" />
        <meta
          property="og:site_name"
          content="CheapUniverse"
          key="ogsitename"
        />
        <meta property="og:title" content={post.title} key="ogtitle" />
        <meta
          property="og:description"
          content={post.excerpt.slice(0, 250)}
          key="ogdesc"
        />
      </Head>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 break-words">
        <div className="relative overflow-hidden shadow-md mb-2 md:mb-6">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="object-top h-full w-full rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center w-full mb-4 md:mb-8 justify-between">
            <div className="cursor-pointer text-sm font-bold flex items-center justify-around rounded-lg text-white px-1 w-[70px] md:w-[80px] md:px-2.5 py-1 hover:shadow-lg bg-indigo-700 active:scale-90 transition duration-150">
              {post.visitCount}
              {post.visitCount > 100 ? " 🔥 " : " 👀 "}
            </div>
            <div className="flex items-center justify-center lg:mb-0 lg:w-auto ">
              <img
                src={post.author.photo}
                alt={post.author.name}
                className="align-middle rounded-full"
                height="30px"
                width="30px"
              />
              <p className="inline align-middle text-gray-700 ml-2 text-xs md:text-sm">
                {post.author.name}
              </p>
            </div>
            <div className="flex items-center justify-center font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
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
              <span className="align-middle text-xs md:text-sm justify-center">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
          <h1 className="mb-8 text-xl md:text-3xl font-semibold text-center">
            {post.title}
          </h1>
          <div
            className={`max-w-2xl mx-auto post ${postStyles.post}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {!user ? (
            <div className="text-center">
              {/* You can show a loading indicator here */}
              <p>Wait a second...</p>
            </div>
          ) : (
            <>
              {user &&
              (user.role === "P" || user.role == "A") &&
              post.blogLinkStatus !== "E" ? (
                <div className="text-center">
                  <h3 className="mb-2 text-lg md:text-xl font-semibold text-center">
                    You are Pro Member Download whatever you want...😀
                  </h3>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="mb-2 text-lg md:text-xl font-semibold text-center">
                    Pay to get Download Link
                  </h3>
                </div>
              )}
            </>
          )}
          {post.blogLinkStatus != "E" && (
            <p className="text-center">
              Watch 👉
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-500 text-sm font-bold inline-block rounded-lg py-1 m-1 mx-2  active:scale-90 transition duration-150"
                key={"download"}
                href={
                  user &&
                  (user.role === "P" || user.role == "A") &&
                  post.blogLinkStatus != "E"
                    ? `${siteUrl}#how-to-dl`
                    : `${siteUrl}download`
                }
              >
                How to download video
              </Link>
            </p>
          )}
          {user &&
          (user.role === "P" || user.role == "A") &&
          post.blogLinkStatus != "E" ? (
            <div className="text-center">
              {post.downloads.length > 0 &&
                post.downloads.map((download) => (
                  <div className="inline-block sm:m-2" key={download.id}>
                    <span
                      onClick={
                        // () => getMeDownloadLinkAndRedirect(download.id)
                        () => handleDownloadBySlug(false)
                        // () => window.open(download.short_link)
                      }
                      className="hover:shadow-xl hover:scale-95 hover:bg-indigo-700 m-1 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block bg-pink-600 rounded-full text-white px-4 py-2 sm:px-8 sm:py-3 cursor-pointer"
                    >
                      {download.title}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center">
              {post.downloads.length > 0 &&
                post.downloads.map((download) => (
                  <div className="inline-block sm:m-2" key={download.id}>
                    <span
                      onClick={
                        // () => getMeDownloadLinkAndRedirect(download.id)
                        // handleDownloadBySlug(false)
                        () => window.open(download.short_link)
                      }
                      className="hover:shadow-xl hover:scale-95 hover:bg-indigo-700 m-1 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block bg-pink-600 rounded-full text-white px-4 py-2 sm:px-8 sm:py-3 cursor-pointer"
                    >
                      {download.title}
                    </span>
                  </div>
                ))}
            </div>
          )}

          <blockquote
            className={`otroBlockquote ${postStyles.otroBlockquote} mt-6`}
          >
            Zip/rar files password can be one of these :- tutflix / XDJ /
            FreeCourseUniverse / CheapUniverse
          </blockquote>
          <AdsContainer
            client={"ca-pub-2093009960356176"}
            slot={"4338520783"}
            style={{
              borderRadius: "20px",
              display: "inline-block",
              width: "auto",
              height: "auto",
            }}
          />

          {/* {post.blogLinkStatus != "E" && (
            <div className="text-center">
              <h3 className="mt-8 text-lg md:text-xl font-semibold">
                Option {`${decisionLists.includes("9") ? "" : "2"}`} :-
                Contribute to this forum (Card)
              </h3>
              <h3 className="text-black font-bold my-2 mt-4 text-sm sm:text-base">
                Note: we don't sell any courses... <br /> This forum is open for
                contributors only
              </h3>
              <p className="mb-4">
                {" "}
                We want to support the course creators as well as learners
              </p>
              <span
                onClick={handelAddToCart}
                className={`${
                  getCartItems()?.includes(post.id)
                    ? "pointer-events-none bg-gray-400"
                    : ""
                } hover:shadow-xl hover:scale-95 hover:bg-black m-1 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block bg-indigo-700 rounded-full text-white px-4 py-2 sm:px-8 sm:py-3 cursor-pointer`}
              >
                Contribute (card only)
              </span>
              <br />
              {getCartItems()?.includes(post.id) && (
                <p className="mb-4">
                  You have already added this course to the cart
                </p>
              )}
              {
                <>
                  <p>
                    You will get encrypted Download Link after contribution 👉
                    <Link
                      className="ml-4 cursor-pointer text-sm font-bold inline-block hover:bg-pink-600 rounded-lg text-white px-3 py-1 m-1 mx-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150"
                      key={"my-courses"}
                      href={`/myprofile/dashboard`}
                    >
                      My Courses
                    </Link>
                  </p>
                  <p className="translate-y-3.5">
                    Watch 👉
                    <Link
                      className="cursor-pointer text-blue-500 text-sm font-bold inline-block rounded-lg py-1 m-1 mx-2  active:scale-90 transition duration-150"
                      key={"my-courses"}
                      href={`#how-to-dl`}
                    >
                      How to download video
                    </Link>
                  </p>
                </>
              }
            </div>
          )} */}
        </div>
        {post.blogLinkStatus == "E" && (
          <p className="text-black font-bold my-2 mt-4 text-sm sm:text-base mx-4 text-center">
            This Link is expired comment if needed will add it..
          </p>
        )}
        <CrossSellHorizontal/>
        <div>
          <AdsContainer
            client={"ca-pub-2093009960356176"}
            slot={"9894549506"}
            adFormat={"fluid"}
            data-ad-layout-key="-6i+cz+4x-i-7k"
            style={{
              display: "block",
              borderRadius: "20px",
            }}
          />
        </div>
      </div>
      {flag && (
        <Modal
          classNames={{
            overlayAnimationIn: "customEnterOverlayAnimation",
            overlayAnimationOut: "customLeaveOverlayAnimation",
            modalAnimationIn: "customEnterModalAnimation",
            modalAnimationOut: "customLeaveModalAnimation",
          }}
          animationDuration={500}
          open={flag}
          onClose={() => setFlag(false)}
          showCloseIcon={false}
          styles={{
            modal: {
              background: "#FFFF00",
              borderRadius: "20px",
            },
          }}
        >
          <SupportSuccess
            setFlag={setFlag}
            onFinish={() => onFinish("final")}
          />
        </Modal>
      )}
    </>
  );
};

export default PostDetail;
