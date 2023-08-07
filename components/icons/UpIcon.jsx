import React from "react";

const UpIcon = ({props}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-up cursor-pointer"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="6 15 12 9 18 15" />
    </svg>
  );
};

export default UpIcon;
