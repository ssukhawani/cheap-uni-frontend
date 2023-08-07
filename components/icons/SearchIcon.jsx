import React from "react";

const SearchIcon = ({props}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-search"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="#A0AEC0"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <circle cx={10} cy={10} r={7} />
      <line x1={21} y1={21} x2={15} y2={15} />
    </svg>
  );
};

export default SearchIcon;
