import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchBlogDetails,
  getDecisionList,
  getDownloadsBySlug,
  getTDBlogList,
  membershipDetails,
} from "../../services";
import { useQuery, dehydrate } from "react-query";
import { useRouter } from "next/router";
import {
  PostDetail,
  Categories,
  PostWidgets,
  Author,
  Comments,
  CommentForm,
} from "../../components";
import Smiley from "../../assets/images/smiley.gif";
import { queryClient } from "../../react-query/queryClient";
import { queryKeys } from "../../constants/query-keys";
import { AdsContainer } from "../../components/AdsContainer";
import DigitalOcean from "../../components/DigitalOcean";
import Image from "next/legacy/image";
import { checkIsNoob, decode } from "../../utility/functions";
import TakenDown from "../../components/TakenDown";
import HowToDownload from "../../components/HowToDownload";
import CrossSell from "../../components/CrossSell";
import { getStoredUser } from "../../utility/localStorage";
// import TelegramCard from "../../components/Telegram";

export function handleDownload(links, isTD) {
  const content = `<html><body><h1>${
    isTD
      ? "This content has been taken down -CheapUniverse.org"
      : "Knowledge++ CheapUniverse.org"
  } 🤠</h1>`;
  const content3 =
    "<h3>If links are not working ping us in comment section</h3>";
  const content2 = "<h2>Password: FreeCourseUniverse or CheapUniverse</h2>";
  const content5 =
    "<h2>Follow the below steps carefully, otherwise u wont be able to get</h3> <br/> <h2>These are the download Links 👇<h2/>";
  const content4 =
    "<h3>Step 1: Visit this link select your account & Authorize, <br/> Step 2: close the tab (keep open the same browser) & again open same link </br> Step 3: Now Select your logged in account <br/> Step 4: Copy, U will get it on ur drive <br/> <br/> If u get any decryption server error click on load button multiple times and try refreshing page </h3>";

  const video =
    "<h3>If still not clear follow each step from the video without using ur brain...</h3> <br/> <video src='https://media.graphassets.com/cBVZvHpSTquSt4Ik6sw5' controls></video>";

  const data =
    content +
    content2 +
    content5 +
    links
      .map((link) => {
        let decoded = decode(link.url);
        if (decoded.includes("https://decrypt.hashhackers.com")) {
          return `<p><a href="${decoded}">${decoded}</a></p>`;
        } else {
          return `<p><a href="${decoded}">${link.title}</a></p>`;
        }
      })
      .join("") +
    `${
      decode(links[0].url).includes("https://decrypt.hashhackers.com") ||
      decode(links[0].url).includes("https://api.cheapuniverse.org") ||
      decode(links[0].url).includes("https://share.tutflix.org") ||
      decode(links[0].url).includes("https://api.freecourseuniverse.com")
        ? content4 +
          content3 +
          '<br /><img src="https://i.imgur.com/ZgTZnTD.png" alt="Image" />' +
          video
        : ""
    }` +
    "</body></html>";
  const blob = new Blob([data], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "links.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const PostDetails = () => {
  const router = useRouter();
  const slug = router.query?.slug;
  const [decisionLists, setDecisionLists] = useState([]);
  const [user, setUser] = useState(null);

  const { data: post, isLoading } = useQuery(
    [queryKeys.BLOG_DETAILS, slug],
    () => fetchBlogDetails(slug),
    {
      enabled: slug.length > 0,
      cacheTime: 36000,
      staleTime: 0, // stale 0 because i want to update view count immediately on blog view
      // so it will fetch update data in background
    }
  );

  useMemo(() => {
    async function fetchData() {
      const storedUser = getStoredUser();
      if (!storedUser) {
      } else {
        try {
          const response = await membershipDetails();
          const updatedData = response.data;
          setUser({ ...storedUser, ...updatedData });
        } catch (error) {
          console.error("Error fetching membership details:", error);
        }
      }
    }
    fetchData();
  }, [slug]);

  useEffect(() => {
    getTDBlogList().then((result) => {
      const dmcaList = result.map((post) => post.slug);
      getDecisionList().then((res) => {
        if (res.length) {
          const list = res.map((data) => String(data.number));
          const isNoob = checkIsNoob();
          if (dmcaList.includes(slug) && list.includes("8") && !isNoob) {
            // Your code to execute for regular users goes here
            // handleDownloadBySlug(true);
          }
          setDecisionLists(list);
        } else {
          setDecisionLists([]);
        }
      });
      // if (dmcaList.includes(slug)) {
      //   router.push({
      //     pathname: "/",
      //   });
      // }
    });
  }, []);

  async function handleDownloadBySlug(isTD) {
    try {
      const response = await getDownloadsBySlug(slug);
      handleDownload(response?.data, isTD);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isLoading || !post ? (
        <div className="h-screen w-screen grid place-content-center">
          <Image height={100} width={100} src={Smiley} alt="loading..." />
        </div>
      ) : (
        <div className="mt-28 container mx-auto px-4 sm:px-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
              <PostDetail
                post={post}
                setDecisionLists={setDecisionLists}
                decisionLists={decisionLists}
                handleDownloadBySlug={handleDownloadBySlug}
                user={user}
              />
              <Author author={post?.author} />
              <CommentForm slug={post.slug} />
              <Comments slug={post.slug} />
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="relative lg:sticky top-8">
                {/* <Contribution /> */}
                {!user ? (
                  <CrossSell />
                ) : user.role != "P" ? (
                  <CrossSell />
                ) : (
                  <></>
                )}
                {/* <TelegramCard/> */}
                <HowToDownload />
                <DigitalOcean />
                <div className="rounded-lg my-4">
                  <AdsContainer
                    client={"ca-pub-2093009960356176"}
                    slot={"7095168689"}
                    adFormat={"auto"}
                    data-full-width-responsive="true"
                    style={{ display: "block" }}
                  />
                </div>
                <PostWidgets
                  slug={post.slug}
                  tags={post.tags.map((tag) => tag.slug)}
                />
                <TakenDown />
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
      )}
    </>
  );
};

export default PostDetails;

export const getStaticProps = async (context) => {
  const slug = context.params?.slug;

  await queryClient.prefetchQuery([queryKeys.BLOG_DETAILS, slug], () =>
    fetchBlogDetails(slug)
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
