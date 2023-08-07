import React from "react";
import Image from "next/legacy/image";
import AuthorImage from "../assets/images/teckfreck.png"

const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-60">
      <div className="absolute left-0 right-0 -top-14 flex justify-center items-center">
        <Image
          alt={author.name}
          unoptimized
          height="100px"
          width="100px"
          className="rounded-full"
          src={AuthorImage}
        />
      </div>
      <h3 className="text-white my-4 text-sm md:text-xl font-bold">
        {author.name}
      </h3>
      <p className="text-white text-sm md:text-lg">{author.bio}</p>
    </div>
  );
};

export default Author;
