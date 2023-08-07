import { useRouter } from "next/router";
import React from "react";

const DigitalOcean = () => {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push(
          "https://www.digitalocean.com/?refcode=720653db5cbd&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"
        )
      }
      className="bg-white rounded-lg shadow-lg p-4 sm:p-4 mb-8 text-center relative cursor-pointer"
    >
      <div className="absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
        Affiliate
      </div>
      <h2 className="text-[#FF1E00] font-bold my-4 text-lg sm:text-2xl">
        {" "}
        This site is hosted on <span className="text-black">Digital Ocean</span>
      </h2>
      <h4 className="text-[#FF1E00] font-bold text-sm">
        Get <span className="text-black">$200</span> credit Instantly{" "}
      </h4>
      <h6 className="my-4 font-bold text-sm">
        Offer available for limited time <br />
        <span className="text-[#711A75]">
          {" "}
          ( Take advantage of free credits 👇 ){" "}
        </span>
      </h6>
      <div>
        <a href="https://www.digitalocean.com/?refcode=720653db5cbd&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge">
          <img
            src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg"
            alt="DigitalOcean Referral Badge"
            className="text-center w-full"
          />
        </a>
      </div>
    </div>
  );
};

export default DigitalOcean;
