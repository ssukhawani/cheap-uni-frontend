import Link from "next/link";
import React from "react";

const TelegramCard = () => (
  <div className="bg-white rounded-lg shadow-lg p-6 sm:p-4 mb-8 relative cursor-pointer">
    <div className="absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
      Telegram
    </div>
    <div className="mx-auto mb-4 max-w-sm shadow rounded-lg border-4 border-indigo-700 bg-gray-300">
      <div className="pt-6 px-8 md:px-12 h-max text-center">
        <h2 className="text-indigo-700 text-base font-bold mb-2">
          Join Our Telegram Group
        </h2>
        <p className="text-gray-800 text-sm mb-4">
          Stay updated with our latest updates and announcements on Telegram!
        </p>
      </div>
      <div className="flex justify-center pb-8">
        <div>
          <Link
            className="w-full hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block hover:bg-pink-600 rounded-full text-white px-8 py-3 cursor-pointer"
            href={`https://t.me/cheapuniverse`}
            target="_blank"
            rel="noopener noreferrer"
          >
            I will Join
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default TelegramCard;
