import { toast } from "react-toastify";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import EyeHide from "../components/icons/EyeHide";
import EyeShow from "../components/icons/EyeShow";
import { errors } from "../constants/errors";
import { toastMsg } from "../constants/toast-messages";
import { signUp } from "../services";
import Loading from "../assets/images/loading.gif";
import { setStoredKey } from "../utility/localStorage";

const helperObj = {
  username: "Username",
  email: "Email",
  password: "Password",
  first_name: "First Name",
  last_name: "Last Name",
};

export const giveMeErrorFor = (errorFieldName) => {
  return (
    !!errorFieldName && (
      <p className="my-1 text-xs leading-3 tracking-normal text-red-600">
        {errorFieldName}
      </p>
    )
  );
};

const signup = () => {
  const router = useRouter();
  const [showpass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [signUpDetails, setSignUpDetails] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [inputErrors, setInputErrors] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
    first_nameError: "",
    last_nameError: "",
  });

  const { username, email, password, first_name, last_name } = signUpDetails;
  const {
    usernameError,
    emailError,
    passwordError,
    first_nameError,
    last_nameError,
  } = inputErrors;

  const handelChange = (prop) => (event) => {
    const { value } = event.target;
    if (value === "") {
      inputErrors[`${prop}Error`] = `${helperObj[prop]} ${errors.EMPTY_INPUT}`;
    } else {
      inputErrors[`${prop}Error`] = "";
    }
    setSignUpDetails({ ...signUpDetails, [prop]: value });
    setInputErrors({ ...inputErrors });
  };

  const handelSignUp = () => {
    let signUpDetailErrors = [];
    setIsLoading(true);
    Object.entries(signUpDetails).forEach(([key, value]) => {
      if (!Boolean(value)) {
        signUpDetailErrors.push(key);
      }
    });

    if (signUpDetailErrors.length) {
      signUpDetailErrors.forEach((key) => {
        inputErrors[`${key}Error`] = `${helperObj[key]} ${errors.EMPTY_INPUT}`;
      });
      setInputErrors({ ...inputErrors });
      setIsLoading(false);
    } else {
      signUp(signUpDetails)
        .then((response) => {
          toast.success(toastMsg.VERIFY_ACCOUNT, {
            toastId: "signup",
          });
          router.push({
            pathname: "/login",
            query: { username: window.btoa(username) },
          });
          setStoredKey("USERNAME",window.btoa(username))
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
              Create New account
            </p>
            <p
              tabIndex={0}
              className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
            >
              Already have an account?{" "}
              <Link
                className="hover:text-black focus:text-pink-600 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-purple-700 cursor-pointer"
                href="/login"
              >
                {" "}
                Login here
              </Link>
            </p>
            <div className="w-full flex items-center justify-between py-5">
              <hr className="w-full bg-gray-400" />
              <hr className="w-full bg-gray-400" />
            </div>

            <div className="sm:flex gap-6">
              <div className="sm:w-1/2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  {" "}
                  Username{" "}
                </label>
                <input
                  id="username"
                  aria-labelledby="username"
                  type="text"
                  className={`${
                    !!usernameError && "border-solid border-1 border-red-600"
                  } bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-600 text-gray-800 py-3 w-full pl-3 mt-2`}
                  placeholder="e.g: johndoe"
                  value={username}
                  onChange={handelChange("username")}
                  onKeyPress={(e) => e.key === 'Enter' && handelSignUp()}
                  required
                />
                {giveMeErrorFor(usernameError)}
              </div>
              <div className="sm:w-1/2 mt-3 sm:mt-0">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  {" "}
                  Email{" "}
                </label>
                <input
                  id="email"
                  aria-labelledby="email"
                  type="email"
                  className={`${
                    !!emailError && "border-solid border-1 border-red-600"
                  } bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-600 text-gray-800 py-3 w-full pl-3 mt-2`}
                  placeholder="e.g: john@gmail.com "
                  value={email}
                  onChange={handelChange("email")}
                  onKeyPress={(e) => e.key === 'Enter' && handelSignUp()}
                  required
                />
                {giveMeErrorFor(emailError)}
              </div>
            </div>

            <div className="mt-3 sm:mt-6 w-full">
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
                  onKeyPress={(e) => e.key === 'Enter' && handelSignUp()}
                  required
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

            <div className="mt-3 sm:mt-6 flex gap-6">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  {" "}
                  First Name{" "}
                </label>
                <input
                  id="first_name"
                  aria-labelledby="first_name"
                  type="text"
                  className={`${
                    !!first_nameError && "border-solid border-1 border-red-600"
                  } bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-600 text-gray-800 py-3 w-full pl-3 mt-2`}
                  placeholder="e.g: John"
                  value={first_name}
                  onChange={handelChange("first_name")}
                  onKeyPress={(e) => e.key === 'Enter' && handelSignUp()}
                  required
                />
                {giveMeErrorFor(first_nameError)}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  {" "}
                  Last Name{" "}
                </label>
                <input
                  id="lastName"
                  aria-labelledby="lastName"
                  type="text"
                  className={`${
                    !!last_nameError && "border-solid border-1 border-red-600"
                  } bg-gray-200 border rounded text-sm font-medium leading-none placeholder-gray-600 text-gray-800 py-3 w-full pl-3 mt-2`}
                  placeholder="e.g: Doe"
                  value={last_name}
                  onChange={handelChange("last_name")}
                  required
                  onKeyPress={(e) => e.key === 'Enter' && handelSignUp()}
                />
                {giveMeErrorFor(last_nameError)}
              </div>
            </div>

            <div className="mt-6">
              <button
                role="button"
                className={`flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 w-full ${
                  !isLoading && "py-4"
                }`}
                onClick={handelSignUp}
              >
                {isLoading ? (
                  <Image
                    height={42}
                    width={40}
                    src={Loading}
                    alt="loading..."
                  />
                ) : (
                  "Create my account"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default signup;
