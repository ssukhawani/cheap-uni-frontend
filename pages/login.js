import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EyeHide from "../components/icons/EyeHide";
import EyeShow from "../components/icons/EyeShow";
import { errors } from "../constants/errors";
import { toastMsg } from "../constants/toast-messages";
import { loggedInUserDetails, login, membershipDetails } from "../services";
import { setStoredUser, updateStoredUser } from "../utility/localStorage";
import { giveMeErrorFor } from "./signup";
import Loading from "../assets/images/loading.gif";
import Image from "next/legacy/image";

const helperObj = {
  username: "Username",
  password: "Password",
};

const Login = () => {
  const [showpass, setShowPass] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    query: { username: queryUser },
  } = router;

  useEffect(() => {
    if (!!queryUser) {
      setLoginDetails({
        ...loginDetails,
        username: window.atob(queryUser),
      });
    }
  }, [queryUser]);

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const [inputErrors, setInputErrors] = useState({
    usernameError: "",
    passwordError: "",
  });

  const { username, password } = loginDetails;
  const { usernameError, passwordError } = inputErrors;

  const handelChange = (prop) => (event) => {
    const { value } = event.target;
    if (value === "") {
      inputErrors[`${prop}Error`] = `${helperObj[prop]} ${errors.EMPTY_INPUT}`;
    } else {
      inputErrors[`${prop}Error`] = "";
    }
    setLoginDetails({ ...loginDetails, [prop]: value });
    setInputErrors({ ...inputErrors });
  };

  const handelLogin = () => {
    let loginDetailErrors = [];
    setIsLoading(true);
    Object.entries(loginDetails).forEach(([key, value]) => {
      if (!Boolean(value)) {
        loginDetailErrors.push(key);
      }
    });

    if (loginDetailErrors.length) {
      loginDetailErrors.forEach((key) => {
        inputErrors[`${key}Error`] = `${helperObj[key]} ${errors.EMPTY_INPUT}`;
      });
      setInputErrors({ ...inputErrors });
      setIsLoading(false);
    } else {
      login(loginDetails)
        .then((response) => {
          setStoredUser({
            ...response.data,
            jwt_access: `JWT ${response.data.access}`,
          });

          // Define the API requests
          const loggedInUserDetailsPromise = loggedInUserDetails();
          const membershipDetailsPromise = membershipDetails();

          // Use Promise.all() to wait for both promises to resolve
          Promise.all([loggedInUserDetailsPromise, membershipDetailsPromise])
            .then(([userDetailsResponse, membershipDetailsResponse]) => {
              updateStoredUser({ ...userDetailsResponse.data, ...membershipDetailsResponse.data });

              toast.success(toastMsg.LOGIN_SUCCESS, {
                toastId: "login",
              });

              router.push({
                pathname: "/",
              });
            })
            .catch((error) => {
              // Handle errors
              console.error("Error:", error);
            });
        })
        .catch((err) => {
          if (err && err.response) {
            Object.entries(err.response.data).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                value.forEach((error) => {
                  toast.error(error, {
                    toastId: key,
                  });
                });
                inputErrors[`${key}Error`] = errors.INVALID_INPUT;
              } else {
                if (key === "detail") {
                  toast.error(value, {
                    toastId: key,
                  });
                }
              }
            });
            setInputErrors({ ...inputErrors });
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      <div>
        <div className="px-6 xl:px-20 md:px-10 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center ">
          <div className="mt-10 bg-white shadow-lg md:w-1/2 w-full lg:px-10 px-6 sm:py-10 py-6 rounded-tl-3xl rounded-br-3xl">
            <p
              tabIndex={0}
              className="focus:outline-none sm:text-2xl font-extrabold leading-6 text-gray-800"
            >
              Login to your account
            </p>
            <p
              tabIndex={0}
              className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
            >
              Dont have account?{" "}
              <Link
                className="hover:text-black focus:text-pink-600 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-purple-700 cursor-pointer"
                href="/signup"
              >
                {" "}
                Sign up here
              </Link>
            </p>
            <div className="w-full flex items-center justify-between py-5">
              <hr className="w-full bg-gray-400" />
              <hr className="w-full bg-gray-400" />
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium leading-none text-gray-800"
              >
                {" "}
                Username ( not email )
              </label>
              <input
                id="username"
                aria-labelledby="username"
                type="text"
                className={`${
                  !!usernameError && "border-solid border-1 border-red-600"
                } bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2`}
                placeholder="e.g: johndoe"
                value={username}
                onChange={handelChange("username")}
                required
                onKeyPress={(e) => e.key === "Enter" && handelLogin()}
              />
              {giveMeErrorFor(usernameError)}
            </div>
            <div className="mt-6 w-full">
              <label
                htmlFor="myInput"
                className="text-sm font-medium leading-none text-gray-800"
              >
                {" "}
                Password{" "}
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  id="myInput"
                  type={showpass ? "text" : "password"}
                  className={`${
                    !!passwordError && "border-solid border-1 border-red-600"
                  } bg-gray-200 border rounded text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2`}
                  onChange={handelChange("password")}
                  required
                  onKeyPress={(e) => e.key === "Enter" && handelLogin()}
                />
                <div
                  onClick={() => setShowPass(!showpass)}
                  className="absolute right-0 mt-2 mr-3 cursor-pointer"
                >
                  <div id="show">
                    <EyeShow />
                  </div>
                  <div id="hide" className="hidden">
                    <EyeHide />
                  </div>
                </div>
              </div>
              {giveMeErrorFor(passwordError)}
            </div>
            <p
              tabIndex={0}
              className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
            >
              <Link
                href="/forgot-password"
                className="hover:text-black focus:text-pink-600 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-purple-700 cursor-pointer"
              >
                {" "}
                Forgot password
              </Link>
            </p>
            <div className="mt-8">
              <button
                role="button"
                className={`flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 w-full ${
                  !isLoading && "py-4"
                }`}
                onClick={handelLogin}
              >
                {isLoading ? (
                  <Image
                    height={42}
                    width={40}
                    src={Loading}
                    alt="loading..."
                  />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
