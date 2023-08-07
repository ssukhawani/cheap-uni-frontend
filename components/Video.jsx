import React, { useRef } from "react";

const VideoComponent = ({ videoUrl, title }) => {
  const videoRef = useRef(null);

  return (
    <div className="relative z-[10]">
      <h2 className="text-white font-bold my-3 text-lg sm:text-xl z-[10] mt-6">
        {title}
        <br />
      </h2>
      <video ref={videoRef} src={videoUrl} className="w-full h-auto" controls />
      <div className="border-animation" />
    </div>
  );
};

export default VideoComponent;
