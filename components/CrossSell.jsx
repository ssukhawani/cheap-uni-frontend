import React, { useState, useEffect } from "react";
import Link from "next/link";
import { featureList } from "../constants/misc";
import Image from "next/legacy/image";
import { getAllPlans } from "../services";

const CrossSell = () => {
  const [plans, setPlans] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const stepInterval = 3000;

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (!timerPaused) {
        setActiveStep((prevStep) => (prevStep + 1) % plans.length);
      }
    }, stepInterval);

    return () => clearInterval(interval);
  }, [plans.length, timerPaused]);

  const handleStepDotClick = (index) => {
    setActiveStep(index);
    setTimerPaused(true);

    setTimeout(() => {
      setTimerPaused(false);
      setActiveStep((index + 1) % plans.length);
    }, stepInterval*3);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-4 mb-8 relative cursor-pointer">
      <div className="absolute top-1 right-2 hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 transition duration-150 text-xs inline-block hover:bg-pink-600 font-bold rounded-full text-white px-3 py-1 cursor-pointer">
        Membership
      </div>

      {/* <h2 className="text-purple-500 font-bold my-3 text-lg sm:text-xl">
        Membership Launched...
        <br />
      </h2> */}

      <div className="mx-auto mb-4 max-w-sm shadow rounded-lg border-4 border-indigo-700 bg-gray-300">
        <div className="pt-8 px-8 pb-6">
          <h2 className="text-2xl text-center text-gray-800 pb-3 font-bold">
            Membership Plans
          </h2>
          <p className="text-sm text-center text-gray-800 pb-5 leading-normal px-10">
            We are bringing so many new things at the fraction of a cost....
          </p>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center">
            {plans.map((_, index) => (
              <div
                key={index}
                className={`w-5 h-5 mx-2 rounded-full cursor-pointer ${
                  activeStep === index ? "bg-indigo-700" : "bg-indigo-300"
                }`}
                onClick={() => handleStepDotClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="pt-6 px-8 md:px-12 h-max">
          <ul className="text-sm text-gray-500">
            {plans.map((plan, index) => (
              <li
                key={index}
                className={`mb-4 p-4 bg-white rounded-lg shadow-md text-center ${
                  activeStep === index ? "block" : "hidden"
                }`}
              >
                <div className="flex justify-between pl-12 pr-12 pt-4 pb-4 bg-gray-100">
                  <p className="text-base text-indigo-700 font-bold">
                    {plan.duration_months} Months Plan:
                    <span className="text-gray-700">${plan.price_in_dollar}</span>
                  </p>
                </div>

                <ul className="mt-2 h-[30vh] overflow-y-auto">
                  {featureList.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="pl-3 py-2 flex items-center"
                    >
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
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center pb-8">
          <div>
            <Link
              className="w-full hover:shadow-lg hover:-translate-y-1 bg-indigo-700 active:scale-90 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block hover:bg-pink-600 rounded-full text-white px-8 py-3 cursor-pointer"
              href={`/membership`}
            >
              Get me one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossSell;
