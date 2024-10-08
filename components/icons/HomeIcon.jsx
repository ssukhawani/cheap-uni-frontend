import React from "react";

const HomeIcon = ({ props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-grid cursor-pointer"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <rect x={4} y={4} width={6} height={6} rx={1} />
      <rect x={14} y={4} width={6} height={6} rx={1} />
      <rect x={4} y={14} width={6} height={6} rx={1} />
      <rect x={14} y={14} width={6} height={6} rx={1} />
    </svg>
  );
};

export default HomeIcon;
