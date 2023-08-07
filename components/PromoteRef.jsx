import Image from "next/legacy/image";
import React, { useState } from "react";
import { submitContactUsForm } from "../services";
import Loading from "../assets/images/loading.gif";
import { toast } from "react-toastify";
import { toastMsg } from "../constants/toast-messages";
import { AdsContainer } from "./AdsContainer";

const PromoteRef = () => {
  const [contactUs, setContactUs] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, phone, message } = contactUs;

  const handelChange = (prop) => (event) => {
    const { value } = event.target;
    setContactUs({ ...contactUs, [prop]: value });
  };

  const handelSubmit = () => {
    setIsLoading(true);

    if (!!name && !!email && !!phone) {
      submitContactUsForm(contactUs)
        .then((response) => {
          toast.success(toastMsg.WILL_CONNECT_U, {
            toastId: "contact",
          });
        })
        .catch((err) => {
          if (err && err.response) {
            Object.entries(err.response.data).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                value.forEach((error) => {
                  toast.error(
                    key.charAt(0).toUpperCase() + key.slice(1) + " - " + error,
                    {
                      toastId: key,
                    }
                  );
                });
              } else {
                if (key === "detail") {
                  toast.error(value, {
                    toastId: key,
                  });
                }
              }
            });
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      toast.error("All fields are required except message");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-10 flex-col text-center">
      <div>
        <AdsContainer
          client={"ca-pub-2093009960356176"}
          slot={"9894549506"}
          adFormat={"fluid"}
          data-ad-layout-key="-6i+cz+4x-i-7k"
          style={{
            display: "block",
            borderRadius: "20px",
          }}
        />
      </div>
      <h2 className="text-[black] font-bold m-4 mx-10 text-lg sm:text-2xl">
        {" "}
        To Promote anything on our site Leave The Message here, We will connect
        with you
      </h2>

      <div className="px-6 md:px-10 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex justify-center ">
        <div className="text-left flex flex-col gap-4 mt-10 bg-white shadow-lg md:w-2/3 w-full px-6 sm:py-10 py-6 rounded-tl-3xl rounded-br-3xl">
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium leading-none text-gray-800"
            >
              Name{" "}
            </label>
            <input
              id="name"
              aria-labelledby="name"
              type="text"
              className={`bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-600 text-gray-800 py-3 w-full pl-3 mt-2`}
              placeholder="e.g: johndoe"
              value={name}
              onChange={handelChange("name")}
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="text-sm font-medium leading-none text-gray-800"
            >
              Phone No{" "}
            </label>
            <input
              id="phone"
              aria-labelledby="phone"
              type="text"
              className={`bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-600 text-gray-800 py-3 w-full pl-3 mt-2`}
              placeholder="e.g: 982182XXXX"
              value={phone}
              onChange={handelChange("phone")}
              max={10}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-gray-800"
            >
              Email{" "}
            </label>
            <input
              id="email"
              aria-labelledby="email"
              type="text"
              className={`bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-600 text-gray-800 py-3 w-full pl-3 mt-2`}
              placeholder="e.g: johndoe@gmail.com"
              value={email}
              onChange={handelChange("email")}
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-sm font-medium leading-none text-gray-800"
            >
              Message{" "}
            </label>
            <textarea
              id="message"
              aria-labelledby="message"
              type="text"
              className={`bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-600 text-gray-800 py-3 w-full pl-3 mt-2`}
              placeholder="e.g: johndoe"
              value={message}
              onChange={handelChange("message")}
            />
          </div>

          <div className="mt-6">
            <button
              role="button"
              className={`focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 w-full ${
                !isLoading && "py-4"
              }`}
              onClick={handelSubmit}
            >
              {isLoading ? (
                <Image height={42} width={40} src={Loading} alt="loading..." />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg my-4">
        <AdsContainer
          client={"ca-pub-2093009960356176"}
          slot={"6341267557"}
          adFormat={"autorelaxed"}
        />
      </div>
    </div>
  );
};

export default PromoteRef;
