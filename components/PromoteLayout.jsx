import Head from "next/head";
import React from "react";
import { AdsContainer } from "./AdsContainer";
import Categories from "./Categories";
import DigitalOcean from "./DigitalOcean";
import PostWidgets from "./PostWidgets";

const PromoteLayout = ({ children, urlEndpoint }) => {
  return (
    <div className="container mt-28 sm:mt-20 mx-auto px-4 sm:px-10 mb-8 relative">
      <Head>
        <title>CheapUniverse Promote</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="CheapUniverse helps you to get exciting & cool resources at lowest price"
        />
        <meta
          property="og:url"
          content={process.env.SITE_URL + "promote/" + urlEndpoint}
          key="ogurl"
        />
        <meta
          property="og:site_name"
          content="cheapuniverse.org"
          key="ogsitename"
        />
        <meta
          property="og:title"
          content="CheapUniverse Promote"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="CheapUniverse helps you to get exciting & cool resources at lowest price"
          key="ogdesc"
        />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
        <div className="bg-white rounded-lg lg:col-span-8 col-span-1 grid grid-cols-1 sm:gap-5 grid-flow-row auto-rows-max relative pb-12">
          {children}
        </div>
        <div className="lg:col-span-4 col-span-1 ">
          <div className="lg:sticky relative top-8">
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
  );
};

export default PromoteLayout;
