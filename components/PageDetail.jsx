import React from "react";
import postStyles from "./post-styles.module.css";
import Head from "next/head";
import { AdsContainer } from "./AdsContainer";

const PageDetail = ({ page, url, slug, pageRoutes }) => {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.title} />
      </Head>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 break-words">
        <div className="rounded-lg my-4">
          <AdsContainer
            client={"ca-pub-2093009960356176"}
            slot={"7095168689"}
            adFormat={"auto"}
            data-full-width-responsive="true"
            style={{ display: "block" }}
          />
        </div>
        <div className="px-4 py-4 sm:py-2 lg:px-0">
          <div
            className={`max-w-2xl mx-auto post ${postStyles.post}`}
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
        <div className="rounded-lg my-4">
          <AdsContainer
            client={"ca-pub-2093009960356176"}
            slot={"6341267557"}
            adFormat={"autorelaxed"}
          />
          <AdsContainer
            client={"ca-pub-2093009960356176"}
            slot={"6096288180"}
            adFormat={"auto"}
          />
        </div>
      </div>
    </>
  );
};

export default PageDetail;
