import Image from "next/legacy/image";
import React from "react";
import { requestList } from "../constants/misc";

const RequestAcceptedComp = () => {
  return (
    <div className="mt-8 overflow-y-scroll h-[50vh] px-2">
      {requestList.map(({ name }, ind) => (
        <div key={ind + name}>
          <div className="flex items-center w-full mb-4">
            <div className="h-10 w-10 flex-none relative">
              <Image
                layout="fill"
                alt={name}
                className="rounded-full bg-green-tag text-center"
                src="data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg'><text x='10' y='30' font-size='25px'>&#10004;</text></svg>"
              />
            </div>
            <div className="flex-grow ml-4">{name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestAcceptedComp;
