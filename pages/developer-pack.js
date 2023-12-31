import React, { useEffect, useState } from "react";
import DigitalOcean from "../components/DigitalOcean";
import { AdsContainer } from "../components/AdsContainer";
import { createProductOrderRequest, getProductPlans } from "../services";
import { getStoredUser } from "../utility/localStorage";
import { toast } from "react-toastify";
import Image from "next/image";
import Loading from "../assets/images/loading.gif";

const DeveloperPack = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [user, setUser] = useState("");
  const [isLoadingRazorpay, setIsLoadingRazorpay] = useState(false);

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
    async function fetchProductPlans() {
      try {
        const response = await getProductPlans();
        setPlans(response.data);
        if (response.data) {
          setSelectedPlan(response.data[0]);
        }
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
    fetchProductPlans();
  }, []);

  const handleRazorpayPayment = () => {
    if (!selectedPlan) {
      toast.error("Not a valid Plan");
      return;
    }

    setIsLoadingRazorpay(true);

    createProductOrderRequest({
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
            toast.success("Payment success !", {
              toastId: "payment-success",
            });
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
    <div className="mt-28 container mx-auto px-4 sm:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 break-words">
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-xl lg:text-3xl font-bold mb-4">
                <strong>You will get</strong>
              </h1>
              <h2 className="text-xl lg:text-3xl font-bold mb-4">
                <strong>Approved GitHub Student Developer Pack</strong>
              </h2>
              <div className="pt-8 pb-6 mb-10">
                <h2 className="text-lg lg:text-xl  text-red-600 pb-3 font-bold">
                  Limited Qty Available : 20 <br></br> ( First come first serve
                  )
                </h2>
                <p className="text-sm">
                  Others will get refund if all accounts gets sold !
                </p>
              </div>
              <h2 className="text-xl lg:text-3xl font-bold mb-10">
                <strong>Benefits of Student Developer Pack</strong>
              </h2>
              <ul className="list-disc list-inside mb-4 text-sm lg:text-base">
                <li className="font-normal mb-2">
                  1 year domain name registration on the .me TLD{" "}
                  <strong>( Namecheap )</strong>
                </li>
                <li className="font-normal mb-2">
                  $200 in platform credit for 1 year!{" "}
                  <strong>( DigitalOcean )</strong>
                </li>
                <li className="font-normal mb-2">
                  Free access to 25+ Microsoft Azure cloud services plus $100 in
                  Azure credit <strong>( Microsoft Azure )</strong>
                </li>
                <li className="font-normal mb-2">
                  <span className="font-normal">
                    One standard .TECH domain free for 1 year and 2 free email
                    accounts with 100 MB free storage{" "}
                  </span>
                  <strong>(&nbsp; .TECH )</strong>
                </li>
                <li className="font-normal mb-2">
                  Free .LIVE domain name, free privacy protection, and a free
                  SSL certificate. <strong>( Name.com )</strong>
                </li>
                <li className="font-normal mb-2">
                  Free 6-months access to all courses and workshops{" "}
                  <strong>( FrontendMasters )</strong>
                </li>
                <li className="font-normal mb-2">
                  Dive into 6 months of free access to over 70 practical courses{" "}
                  <strong>( Educative.io )</strong>
                </li>
                <li className="font-normal mb-2">
                  Credit of $13 USD per month for 24 months.{" "}
                  <strong>( Heroku )</strong>
                </li>
                <li className="font-normal mb-2">
                  Free 3-month individual subscription
                  <strong> ( DataCamp )</strong>
                </li>
                <li className="font-normal mb-2">
                  Full access to Scrimba’s Pro courses, projects, and coding
                  challenges, which includes 40+ courses.{" "}
                  <strong>( Scrimba )</strong>
                </li>
                <li className="font-normal mb-2">
                  Free access to 20 coding interview questions on{" "}
                  <strong>AlgoExpert</strong>
                </li>
              </ul>
              <p className="mb-4">
                <span className="font-bold text-sm lg:text-base">
                  These are just a few benefits, you can check the full{" "}
                  <a
                    href="https://education.github.com/pack"
                    className="text-blue-600 hover:underline"
                  >
                    list here
                  </a>
                </span>
              </p>
              <span className="font-bold text-sm lg:text-base ">
                Read notes before you make purchase
              </span>
              <p className="mb-4 mt-10">
                <span className="font-normal text-red-600">Notes:</span>
              </p>
              <ol className="list-decimal list-inside mb-4 text-sm lg:text-base">
                <li className="font-normal text-red-600 mb-2">
                  <span className="font-normal">
                    We will share the New Github Account Credentials on your
                    Mail that you are loggedIn with.
                  </span>
                </li>
                <li className="font-normal text-red-600 mb-2">
                  <span className="font-normal">
                    You can change the credentials once you get the access
                  </span>
                </li>
                <li className="font-normal text-red-600 mb-2">
                  <span className="font-normal">
                    Delivery might take 2 - 3 days..
                  </span>
                </li>
                <li className="font-normal text-red-600 mb-2">
                  <span className="font-normal">
                    Further Instructions will be sent on your mail, to access
                    Github student developer pack..
                  </span>
                </li>
              </ol>
            </div>
            <h3 className="text-2xl font-bold mb-4 px-8">
              <strong>Buy Now</strong>
            </h3>
            {selectedPlan && (
              <div className="px-8 flex flex-col gap-3 pb-20 lg:w-[500px]">
                <div className="flex justify-between items-center">
                  <p> Indian Users - </p>
                  <button
                    onClick={handleRazorpayPayment}
                    className={`flex items-center justify-center focus:ring-2 focus:ring-offset-2 px-6 ${
                      isLoadingRazorpay ? "py-1" : "py-4"
                    } focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 ${
                      isLoadingRazorpay && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={isLoadingRazorpay}
                  >
                    {isLoadingRazorpay ? (
                      <Image
                        height={42}
                        width={40}
                        src={Loading}
                        alt="loading..."
                      />
                    ) : (
                      `${selectedPlan.price}₹/Account`
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <p> International Users - </p>
                  <button
                    //   onClick={handlePayPalPayment}
                    className={`flex items-center justify-center focus:ring-2 focus:ring-offset-2 px-6  ${
                      false ? "py-1" : "py-4"
                    } focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-black border rounded hover:bg-gray-800 ${
                      false && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={true}
                  >
                    Coming soon....
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <DigitalOcean />
            <div className="rounded-lg my-4">
              <AdsContainer
                client={"ca-pub-2093009960356176"}
                slot={"7095168689"}
                adFormat={"auto"}
                data-full-width-responsive="true"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg my-4"></div>
    </div>
  );
};

export default DeveloperPack;
