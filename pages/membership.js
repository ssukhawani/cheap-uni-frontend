import React, { useState, useEffect } from "react";
import { createMembershipRequest, getAllPlans } from "../services";
import Image from "next/image";
import Loading from "../assets/images/loading.gif";
import { toast } from "react-toastify";
import { getStoredUser } from "../utility/localStorage";
import { useRouter } from "next/router";

const CrossSell = () => {
  const router = useRouter();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await getAllPlans();
        setPlans(response.data);
        const user = getStoredUser();
        if (!user) {
          setEmail(null);
        } else {
          setEmail(user.email);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    }
    fetchPlans();
  }, []);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPlan) {
      toast.error("Select a membership plan first");
      return;
    }

    setIsLoading(true);

    createMembershipRequest({
      plan: selectedPlan.id,
      is_approved: false,
    })
      .then(() => {
        toast.info("Check your email for the payment link.", {
          toastId: "payment-link",
        });
      })
      .catch(() => {
        toast.error("Error creating payment link. We'll fix this asap.", {
          toastId: "error-payment-link",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="px-6 xl:px-20 md:px-10 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center ">
      <div className="mt-10 bg-white shadow-lg md:w-1/2 w-full lg:px-10 px-6 sm:py-10 py-6 rounded-tl-3xl rounded-br-3xl">
        <h2 className="text-2xl font-bold">Choose a Membership Plan</h2>
        <div className="flex flex-col space-y-2 my-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-4 rounded cursor-pointer flex items-center justify-between ${
                selectedPlan === plan
                  ? "bg-white text-black z-0 border border-indigo-500"
                  : "bg-white border rounded-md focus:outline-none hover:border-indigo-500"
              }`}
              onClick={() => handlePlanSelection(plan)}
            >
              <p>{plan.name}</p>
              {selectedPlan === plan && (
                <div className="h-6 w-6 relative z-1">
                  <Image
                    layout="fill"
                    alt={"features"}
                    className="rounded-full bg-green-tag text-center"
                    src="data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg'><text x='5' y='19' font-size='18px'>&#10004;</text></svg>"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mb-4">
            <h3 className="md:text-xl font-semibold">
              Selected Plan: {selectedPlan.name} ({" "}
              {selectedPlan.duration_months} Months )
            </h3>
            <p>Price: ₹{selectedPlan.price}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Email:
            <input
              type="email"
              value={email}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              disabled
              placeholder="Sign in to get membership"
            />
          </label>
          <div className="mt-8">
            <button
              type="submit"
              className={`flex items-center justify-center focus:ring-2 focus:ring-offset-2 px-4 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 md:w-[60%] ${
                !isLoading && "py-4"
              }`}
            >
              {isLoading ? (
                <Image height={42} width={40} src={Loading} alt="loading..." />
              ) : (
                "Get payment link"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrossSell;
