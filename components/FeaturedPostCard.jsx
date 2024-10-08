import React from 'react';
import moment from 'moment';
import Image from 'next/legacy/image';
import Link from 'next/link';
import AuthorImage from '../assets/images/teckfreck.png'

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-60 sm:h-72 mt-10">
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-60 sm:h-72" style={{ backgroundImage: `url('${post.featuredImage}')` }} />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-70 from-gray-400 via-gray-700 to-black w-full h-60 sm:h-72" />
    <div className="flex flex-col rounded-lg p-4 items-center sm:justify-center absolute w-full h-full">
      <p className="text-white mb-4 text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
      <p className="text-white mb-4 text-shadow font-semibold text-xl sm:text-2xl text-center">{post.title}</p>
      <div className="flex items-center absolute bottom-16 sm:bottom-5 w-full justify-center">
        <Image
          alt={post.author.name}
          height="30px"
          width="30px"
          className="align-middle drop-shadow-lg rounded-full"
          src={AuthorImage}
        />
        <p className="inline align-middle text-white text-shadow ml-2 font-medium">{post.author.name}</p>
      </div>
    </div>
    <Link href={`/post/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
  </div>
);

export default FeaturedPostCard;