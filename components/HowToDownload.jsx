import React from "react";
import RotatingBorderComp from "./RotatingBorderComp";
import VideoComponent from "./Video";

const HowToDownload = () => {
  return (
    <div id={"how-to-dl"}>
      <RotatingBorderComp>
        <div className="z-[2] absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
          Download
        </div>
        <VideoComponent
          videoUrl={"https://media.graphassets.com/cBVZvHpSTquSt4Ik6sw5"}
          title={"How to download ??"}
        />
      </RotatingBorderComp>
    </div>
  );
};

export default HowToDownload;
