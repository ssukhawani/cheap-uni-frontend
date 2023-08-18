import React, { useState, useEffect } from "react";
import Link from "next/link";
import { featureList } from "../constants/misc";
import Image from "next/legacy/image";
import { getAllPlans } from "../services";

const MembershipCard = ({ plan }) => (
  <div className="w-64 bg-white rounded-lg shadow-md p-4 mx-4 cursor-pointer">
    <div className="flex items-center justify-between">
      <h2 className="text-indigo-700 text-base font-bold">{plan.duration_months} Months Plan</h2>
      <span className="text-gray-700">₹{plan.price}</span>
    </div>
    <ul className="mt-2 max-h-[15vh] overflow-y-auto overflow-x-hidden">
      {featureList.map((feature, featureIndex) => (
        <li key={featureIndex} className="pl-3 py-2 flex items-center">
          <div className="h-6 w-6 flex-none relative">
            <Image
              layout="fill"
              alt={"features"}
              className="rounded-full bg-green-tag text-center"
              src="data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg'><text x='5' y='20' font-size='18px'>&#10004;</text></svg>"
            />
          </div>
          <p className="pl-3">{feature.name}</p>
        </li>
      ))}
    </ul>
    <div className="flex justify-center mt-4">
      <Link
        className="w-full bg-indigo-700 hover:bg-pink-600 active:scale-90 transition duration-150 text-xs font-bold rounded-full text-white px-4 py-2 cursor-pointer"
        href={`/membership`}
      >
        Get me one
      </Link>
    </div>
  </div>
);

const CrossSellHorizontal = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await getAllPlans(); // Fetch plans from the API
        setPlans(response.data); // Set the fetched plans to the state
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    }
    fetchPlans();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-8 relative cursor-pointer">
      <div className="absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
        Membership
      </div>
      <div className="mx-auto mb-4 max-w-screen-md shadow rounded-lg border-4 border-indigo-700 bg-gray-300 overflow-x-auto">
        <div className="pt-8 px-8 pb-6 flex space-x-4">
          {plans.map((plan, index) => (
            <MembershipCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrossSellHorizontal;
