import React, { useState, useEffect } from "react";
import {
  createMOrderRequest,
  createPaypalOrderRequest,
  getAllPlans,
  getDecisionList,
} from "../services";
import Image from "next/image";
import Loading from "../assets/images/loading.gif";
import { toast } from "react-toastify";
import { getStoredUser } from "../utility/localStorage";
import { useRouter } from "next/router";

const CrossSell = () => {
  const router = useRouter();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [user, setUser] = useState("");
  const [isLoadingRazorpay, setIsLoadingRazorpay] = useState(false); // Loading state for Razorpay
  const [isLoadingPayPal, setIsLoadingPayPal] = useState(false); // Loading state for PayPal
  const [decisionLists, setDecisionLists] = useState([]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  useEffect(() => {
    getDecisionList().then((res) => {
      if (res.length) {
        const list = res.map((data) => String(data.number));
        setDecisionLists(list);
      }
    });
  }, []);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await getAllPlans();
        setPlans(response.data);
        const user = getStoredUser();
        if (!user) {
          setUser(null);
        } else {
          setUser(user);
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

  const handlePayPalPayment = () => {
    if (!selectedPlan) {
      toast.error("Select a membership plan first");
      return;
    }

    setIsLoadingPayPal(true);

    createPaypalOrderRequest({
      plan: selectedPlan.id,
      is_approved: false,
    })
      .then((response) => {
        // Handle the response data (e.g., redirect to the PayPal payment page)
        const { paypal_order_id, paypal_link_for_payment } = response.data;
        console.log("PayPal Order ID:", paypal_order_id);
        // console.log("PayPal Payment Link:", paypal_link_for_payment);

        // Redirect the user to the PayPal payment page
        window.location.href = paypal_link_for_payment;
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.detail) {
          toast.error(err.response.data.detail, {
            toastId: "error-payment-link",
          });
        } else {
          toast.error("Error creating payment link. We'll fix this asap.", {
            toastId: "error-payment-link",
          });
          console.error("Error creating PayPal order:", error);
        }
      })
      .finally(() => {
        setIsLoadingPayPal(false);
      });
  };

  const handleRazorpayPayment = () => {
    if (!selectedPlan) {
      toast.error("Select a membership plan first");
      return;
    }

    setIsLoadingRazorpay(true);

    createMOrderRequest({
      plan: selectedPlan.id,
      is_approved: false,
    })
      .then((res) => {
        res = res.data;
        // console.log("Success ===>>", res);
        //_________ call razorpay gateway ________
        var options = {
          key: res["razorpay_key"],
          amount: res["order"]["amount"],
          currency: res["order"]["currency"],
          prefill: {
            name: user.username,
            email: user.email,
            contact: "",
          },
          name: "CheapUniverse",
          description: res["product_name"],
          image:
            "https://media.graphassets.com/output=format:jpg/resize=height:200,fit:max/BsWlsxG8TqeneYfkVP2U",
          order_id: res["order"]["id"],
          handler: function (response) {
            // Handle a successful payment here
            // Redirect to the success page
            router.push("/success");
          },
          modal: {
            ondismiss: function () {
              // Handle payment cancellation here
              toast.error("Payment Cancelled", {
                toastId: "payment-cancel",
              });
            },
          },
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.detail) {
          toast.error(err.response.data.detail, {
            toastId: "error-payment-link",
          });
        } else {
          toast.error("Error creating payment link. We'll fix this asap.", {
            toastId: "error-payment-link",
          });
        }
      })
      .finally(() => {
        setIsLoadingRazorpay(false);
      });
  };

  return (
    <div className="px-6 xl:px-20 md:px-10 md:py-12 py-9 mt-8 2xl:mx-auto 2xl:container md:flex items-center justify-center ">
      <div className="mt-10 bg-white shadow-lg md:w-1/2 w-full lg:px-10 px-6 sm:py-10 py-6 rounded-tl-3xl rounded-br-3xl">
        <h2 className="text-2xl font-bold">Membership Plans</h2>
        <div className="flex flex-col space-y-2 my-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-4 rounded cursor-pointer flex items-center justify-between ${selectedPlan === plan
                  ? "bg-white text-black z-0 border border-indigo-500"
                  : "bg-white border rounded-md focus:outline-none hover:border-indigo-500"
                }`}
              onClick={() => handlePlanSelection(plan)}
            >
              <li>{plan.name}</li>
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

        <div className="space-y-4">
          <label className="block">
            Email:
            <input
              type="email"
              value={user ? user.email : ""}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              disabled
              placeholder="Sign in to get membership"
            />
          </label>
          <div className="mb-4">
            <div className="flex flex-col md:flex-row">
              {decisionLists.length > 0 && decisionLists.includes("9") && (
                <>
                  <div className="mb-4 md:mr-4">
                    <button
                      onClick={handleRazorpayPayment}
                      className={`flex items-center justify-center focus:ring-2 focus:ring-offset-2 px-6 ${isLoadingRazorpay ? "py-1" : "py-4"
                        } focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 ${isLoadingRazorpay && "opacity-50 cursor-not-allowed"
                        }`}
                      disabled={isLoadingPayPal}
                    >
                      {isLoadingRazorpay ? (
                        <Image
                          height={42}
                          width={40}
                          src={Loading}
                          alt="loading..."
                        />
                      ) : (
                        "Pay with Razorpay"
                      )}
                    </button>
                  </div>
                  <div className="mb-4">
                    <button
                      onClick={handlePayPalPayment}
                      className={`flex items-center justify-center focus:ring-2 focus:ring-offset-2 px-6  ${isLoadingPayPal ? "py-1" : "py-4"
                        } focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-black border rounded hover:bg-gray-800 ${isLoadingPayPal && "opacity-50 cursor-not-allowed"
                        }`}
                      disabled={isLoadingRazorpay}
                    >
                      {isLoadingPayPal ? (
                        <Image
                          height={42}
                          width={40}
                          src={Loading}
                          alt="loading..."
                        />
                      ) : (
                        "Pay with PayPal"
                      )}
                    </button>
                  </div>
                </>
              )}

              {decisionLists.length > 0 && !decisionLists.includes("9") && (
                <p className="text-[#FF1E00] font-bold text-sm block">
                  Membership has been closed...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      );
};

      export default CrossSell;
