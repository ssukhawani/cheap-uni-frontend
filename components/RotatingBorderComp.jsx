import React from "react";

const RotatingBorderComp = ({ children }) => {
  return (
    <div className="download bg-white rounded-lg shadow-lg p-4 sm:p-4 mb-8 text-center relative cursor-pointer">
      <div className="download">
        {children}
      </div>
    </div>
  );
};

export default RotatingBorderComp;
