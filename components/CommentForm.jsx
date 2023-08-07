import { toast } from "react-toastify";
import Image from "next/legacy/image";
import React, { useState } from "react";
import { errors } from "../constants/errors";
import { toastMsg } from "../constants/toast-messages";
import { giveMeErrorFor } from "../pages/signup";

import { postBlogCommentsBySlug } from "../services";
import { getStoredUser } from "../utility/localStorage";
import Loading from "../assets/images/loading.gif";

const CommentForm = ({ slug, parentComment = null, classOverRide = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  // console.log(parentComment,"parentComment")
  const [commentDetails, setCommentDetails] = useState({
    body: "",
    parent: parentComment,
  });

  const [inputErrors, setInputErrors] = useState({
    bodyError: "",
  });

  const { body, parent } = commentDetails;
  const { bodyError } = inputErrors;

  const handelChange = (prop) => (event) => {
    const { value } = event.target;
    if (value === "") {
      inputErrors[`${prop}Error`] = `Comment ${errors.EMPTY_INPUT}`;
    } else {
      inputErrors[`${prop}Error`] = "";
    }
    setCommentDetails({ ...commentDetails, [prop]: value });
    setInputErrors({ ...inputErrors });
  };

  const handelCommentSubmission = () => {
    const user = getStoredUser();
    setIsLoading(true);
    if (!!user?.access) {
      if (!Boolean(body)) {
        inputErrors[`bodyError`] = `Comment ${errors.EMPTY_INPUT}`;
        setInputErrors({ ...inputErrors });
        setIsLoading(false);
      } else {
        // console.log(commentDetails,"commentDetails")
        postBlogCommentsBySlug(slug, commentDetails)
          .then((response) => {
            toast.info(toastMsg.COMMENT_POSTED, {
              toastId: "commentPosted",
            });
            setCommentDetails({
              body: "",
              parent: parentComment,
            });
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => setIsLoading(false));
      }
    } else {
      toast.error(toastMsg.LOGIN_FOR_COMMENT, {
        toastId: "loginForComment",
      });
      setIsLoading(false)
    }
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-4 sm:pb-6 mb-4 text-sm sm:text-base ${classOverRide}`}
    >
      <h3 className="text-center text-xs sm:text-xl mb-1 sm:mb-2 font-semibold border-b border-blue-300 pb-4">
        Leave a comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className={`${
            !!bodyError && "border-solid border-1 border-red-600"
          } p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700`}
          placeholder="Comment"
          value={body}
          onChange={handelChange("body")}
          required
        />
        {giveMeErrorFor(bodyError)}
      </div>
      <div className="sm:mt-4 grid place-content-center">
        <button
          type="button"
          onClick={handelCommentSubmission}
          className={`flex items-center justify-center ease hover:bg-indigo-700 hover:shadow-lg active:scale-90 my-1 transition duration-150 font-bold bg-pink-600 sm:text-lg rounded-full px-4 sm:px-6 text-white cursor-pointer ${
            !isLoading && "px-4 py-2 sm:px-8 sm:py-3"
          }`}
        >
          {isLoading ? (
            <Image height={40} width={40} src={Loading} alt="loading..." />
          ) : (
            "Post Comment"
          )}
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
