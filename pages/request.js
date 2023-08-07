import React from "react";
import { Categories } from "../components";
import { AdsContainer } from "../components/AdsContainer";
import Contribution from "../components/Contibution";
import Fulfilled from "../components/Fullfilled";
import HowToDownload from "../components/HowToDownload";
import RequestComponent from "../components/RequestComponent";

const Request = () => {


  return (
    <div className="mt-28 container mx-auto px-4 sm:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <RequestComponent />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            {/* <Contribution/> */}
            <HowToDownload/>
            <Fulfilled />
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

export default Request;
