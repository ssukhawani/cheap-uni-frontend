import { useEffect } from "react";

export function AdsContainer({ client, slot, adFormat,styles, ...props }) {
  // useEffect(() => {
  //   (window.adsbygoogle = window.adsbygoogle || []).push({});
  // }, []);

  return (
    <div style={{ textAlign: "left", overflow: "hidden",...styles }}>
      {/* <span className="text-xs"> Advertisment</span> */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
        {...props}
      ></ins>
    </div>
  );
}
